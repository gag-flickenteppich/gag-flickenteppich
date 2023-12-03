import { useParams } from '@solidjs/router'
import { Match, Switch, createResource } from 'solid-js'
import {
  BASE_URL,
} from './RdfFetcher'
import Card from './Card'

type CardInfo = {
  title: string
  persons: Person[]
  events: GagEvent[]
  thumbnailUrl?: string
  episodeNumber: number
}

export default function EpisodeRoute() {
  const params = useParams()

  const [episodeResource] = createResource(() => params.id, fetchCardInfo)

  return (
    <>
      <section class="fl-container h-full sm:min-h-[50vh] flex items-center justify-center">
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
              events={episodeResource()?.events ?? []}
              currentEpisode={episodeResource()?.episodeNumber ?? 0}
            />
          </Match>
        </Switch>
      </section>
    </>
  )
}

async function fetchCardInfo(episodeNumber: string): Promise<CardInfo> {
  console.debug('fetch card info')

  const episode = await fetchEpisode(episodeNumber);
  const persons = await fetchPersons(episodeNumber);
  const events = await fetchEvents(episodeNumber);



  return {
    title: episode.name,
    persons: persons,
    thumbnailUrl: episode.thumbnailUrl ?? '',
    events: events,
    episodeNumber: +episodeNumber
  }
}

async function fetchEpisode(episodeNumber: string) {
  const episodeResponse = await fetch(BASE_URL + `episodes.php?episodeNumber=${episodeNumber}`, { headers: { Accept: "application/vnd.api+json" } });
  const episodePayload: JsonApiDataResponse<GagEpisode, never> = await episodeResponse.json();
  let e: JsonApiResourceObject<GagEpisode>;
  if (episodePayload.data instanceof Array) {
    e = episodePayload.data[0];
  } else {
    e = episodePayload.data;
  }
  const episode = { ...e.attributes }
  return episode
}

async function fetchPersons(episodeNumber: string) {
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

  return persons;
}

async function fetchEvents(episodeNumber: string) {
  const response = await fetch(BASE_URL + `events.php?episodeNumber=${episodeNumber}`, { headers: { Accept: "application/vnd.api+json" } });
  const payload: JsonApiDataResponse<GagEvent, { attributes: GagEpisode }> = await response.json();
  let events: GagEvent[] = [];
  if (payload.data instanceof Array) {
    events = payload.data.map(p => {
      const event = { ...p.attributes, id: p.id }
      event.references = [];
      if (p.relationships) {
        let relationhips = p.relationships["episodes"];
        if (relationhips.data instanceof Array) {
          relationhips.data.forEach(ep => {
            let found = payload.included!.find(x => x.attributes.episodeNumber === ep.id);
            if (found) { event.references?.push(found.attributes); }
          })
        }
      }
      return event;
    })
  } else {
    const p = payload.data;
    events = [{ ...p.attributes, id: p.id }]
  }

  return events;
}
