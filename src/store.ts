import { createStore } from 'solid-js/store'

export const [appStore, mutateAppStore] = createStore<{
    episodes: GagEpisode[]
}>({
    episodes: [],
})
