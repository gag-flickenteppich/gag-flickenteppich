import { A } from '@solidjs/router'
import LinkList from './LinkList'
import { EpisodesRepository } from './Storage'

export default function Card(props: {
  title: string
  thumbnailUrl?: string
  persons: Person[],
  events: GagEvent[],
  currentEpisode: number
}) {
  return (
    <>
      <article class="p-6 pt-7 bg-white container mx-auto drop-shadow-lg rounded-xl border border-slate-300 w-[95%] md:w-[800px] h-full">
        <section>
          <header class="flex flex-col sm:flex-row mb-10">
            <div class="drop-shadow-lg order-2 sm:order-none mx-auto my-8 sm:mx-0 sm:my-0">
              <img
                src={props.thumbnailUrl}
                alt="cover-image"
                class="aspect-square w-44 min-w-[150px]"
              />
            </div>

            <h2 class="text-2xl font-semibold sm:mx-6">
              {props.title}
            </h2>

            <A href={"/episode/" + (props.currentEpisode - 1)} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg></A>
            {props.currentEpisode}/{EpisodesRepository.episodes().length}
            <A href={"/episode/" + (props.currentEpisode + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            </A>

          </header>

          <h3 class="text-xl font-semibold">Personen</h3>
          <LinkList links={props.persons}></LinkList>
        </section>

        <section class="mt-10">
          <h3 class="text-xl font-semibold">Ereignisse</h3>
          <LinkList links={props.events}></LinkList>
        </section>
      </article>
    </>
  )
}
