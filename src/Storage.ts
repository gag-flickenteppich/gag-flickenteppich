import { Accessor, createSignal } from 'solid-js'
import { BASE_URL } from './RdfFetcher'

type GagEpisodeResourceObject = {
	name: string,
	episodeNumber: number,
	website: string,
	episodeUrl: string,
	thumbnailUrl: string,
}


const [episodes, setEpisodes] = createSignal<GagEpisode[]>([])
const [episodesLoading, setEpisodesLoading] = createSignal(false)
export class EpisodesRepository {
	static get episodes(): Accessor<GagEpisode[]> {
		return episodes
	}

	static get loading(): Accessor<boolean> {
		return episodesLoading
	}

	static async getEpisodes(): Promise<void> {
		setEpisodesLoading(true)
		const storedEpisodes = localStorage.getItem('gag-episodes')

		if (storedEpisodes) {
			console.debug('episodes are returned from localstorage')

			setEpisodes(JSON.parse(storedEpisodes))
			setEpisodesLoading(false)
		}


		const response = await fetch(BASE_URL + "episodes.php", { headers: { Accept: "application/vnd.api+json" } });
		const payload: { data: [{ attributes: GagEpisodeResourceObject }] } = await response.json();
		const fetchedEpisodes = JSON.stringify(payload.data.map(resourceObject => {

			 const attrs = resourceObject.attributes;
			const episode:GagEpisode = {
				name: attrs.name,
				episodeNumber: attrs.episodeNumber.toString(),
				episodeUrl: attrs.website
			}
			return episode
		}));

		// if storedEpisodes and fetchedEpisodes do not match
		// update store and return the up to date episodes
		if (!storedEpisodes || storedEpisodes != fetchedEpisodes) {
			console.debug('episodes have updated')
			localStorage.setItem('gag-episodes', fetchedEpisodes)
			setEpisodes(JSON.parse(fetchedEpisodes))
			setEpisodesLoading(false)
		}
	}
}
