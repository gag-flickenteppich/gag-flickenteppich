import { For, Match, Switch, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { EpisodesRepository } from './Storage'

export default function EpisodeSelector() {
  const navigate = useNavigate()

  onMount(async () => {
    await EpisodesRepository.getEpisodes()
  })

  const episodes = EpisodesRepository.episodes

  function changeSelectedEpisode(e: Event) {
    const target = e.target as HTMLSelectElement

    if (target.value !== '') {
      navigate('/episode/' + target.value, { replace: true })
    }
  }

  return (
    <Switch>
      <Match when={EpisodesRepository.loading()}>
        <div class="flex flex-col gap-4 items-center text-xl">
          <img class="animate-spin" src="/gag.png" alt="wait" />
          <div>Einen kleinen Moment. Flicken werden zusammengesucht...</div>
        </div>
      </Match>
      <Match when={!EpisodesRepository.loading()}>
        <select
          class="p-3 rounded-lg bg-white border drop-shadow-xl w-full"
          onchange={changeSelectedEpisode}
        >
          <option value="">Wähle eine Podcastfolge aus ...</option>
          <For each={episodes()}>
            {(episode) => (
              <option value={episode.episodeNumber}>
                {episode.name}
              </option>
            )}
          </For>
        </select>
      </Match>
    </Switch>
  )
}
