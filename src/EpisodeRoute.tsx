import { useParams } from '@solidjs/router'
import { Match, Switch, createResource } from 'solid-js'
import {
  BASE_URL,
} from './RdfFetcher'
import Card from './Card'

type CardInfo = {
  title: string
  persons: Person[]
  thumbnailUrl?: string
}

export default function EpisodeRoute() {
  const params = useParams()

  const [episodeResource] = createResource(() => params.id, fetchCardInfo)

  return (
    <>
      <section class="fl-container h-full sm:h-[50vh] flex items-center justify-center">
        <Switch>
          <Match when={episodeResource.loading}>
            <div class="flex flex-col gap-4 items-center text-xl">
              <img
                class="animate-spin"
                src="/gag.png"
                alt="wait"
              />
              <div>Bitte warten...</div>
            </div>
          </Match>
          <Match when={!episodeResource.loading}>
            <Card
              title={episodeResource()?.title ?? ''}
              persons={episodeResource()?.persons ?? []}
              thumbnailUrl={episodeResource()?.thumbnailUrl ?? ''}
            />
          </Match>
        </Switch>
      </section>
    </>
  )
}

async function fetchCardInfo(episodeNumber: string): Promise<CardInfo> {
  console.debug('fetch card info')

  // fetch episode
  const episodeResponse = await fetch(BASE_URL + `episodes.php?episodeNumber=${episodeNumber}`, { headers: { Accept: "application/vnd.api+json" } });
  const episodePayload: JsonApiDataResponse<GagEpisode, never> = await episodeResponse.json();
  let e: JsonApiResourceObject<GagEpisode>;
  if (episodePayload.data instanceof Array) {
    e = episodePayload.data[0];
  } else {
    e = episodePayload.data;
  }
  const episode = { ...e.attributes }


  // fetch persons
  const response = await fetch(BASE_URL + `persons.php?episodeNumber=${episodeNumber}`, { headers: { Accept: "application/vnd.api+json" } });
  const payload: JsonApiDataResponse<Person, { attributes: GagEpisode }> = await response.json();
  let persons: Person[] = [];
  if (payload.data instanceof Array) {
    persons = payload.data.map(p => {
      const person = { ...p.attributes, id: p.id }
      person.references = [];
      if (p.relationships) {
        let relationhips = p.relationships["episodes"];
        if (relationhips.data instanceof Array) {
          relationhips.data.forEach(ep => {
            let found = payload.included!.find(x => x.attributes.episodeNumber === ep.id);
            if (found) { person.references?.push(found.attributes); }
          })
        }
      }
      return person;
    })
  } else {
    const p = payload.data;
    persons = [{ ...p.attributes, id: p.id }]
  }


  /*   for (const person of persons) {
      const references = await fetcher.fetch(
          new FetchReferencesForPersonStrategy(person.id)
      )
      person.references = references
  }

  const episode = foundEpisodes[0]
  console.log(episode)
 */
  return {
    title: episode.name,
    persons: persons,
    thumbnailUrl: episode.thumbnailUrl ?? '',
  }
}
