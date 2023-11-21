/// <reference types="vite/client" />
type GagEpisode = {
	name: string
	episodeNumber: string
	episodeUrl: string
	thumbnailUrl?: string
}

type Person = {
	id: string
	name: string
	wikipediaUrl?: string
	references?: Partial<GagEpisode>[]
}

type RdfBinding = {
	get: (s: string) => { value: string }
}

declare interface BindingStream {
	on(event: 'data', cb: (binding: RdfBinding) => void)
	on(event: 'error', cb: (error: unknown) => void)
	on(event: 'end', cb: () => void)
}

type JsonApiDataResponse<T, U> = {
	data: JsonApiResourceObject<T> | Array<JsonApiResourceObject<T>>,
	included?: U[]
}

type JsonApiResourceObject<T> = {
	type: ResourceType;
	id: string;
	attributes: T,
	relationships?: { [key: string]: Partial<JsonApiDataResponse<U, V>> }
}

type ResourceType = 'episode' | 'person';
