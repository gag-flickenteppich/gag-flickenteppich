import { For } from 'solid-js'

export default function Card(props: {
    title: string
    thumbnailUrl?: string
    persons: Person[]
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
                    </header>

                    <h3 class="text-xl font-semibold">Personen</h3>
                    <For each={props.persons}>
                        {(person) => (
                            <details class="text-lg ml-2">
                                <summary>
                                    <span class="inline-flex items-center">
                                        {person.name}
                                        <a
                                            class="flex ml-1"
                                            href={person.wikipediaUrl}
                                        >
                                            <img
                                                src="/wikipedia.svg"
                                                alt="wikipedia"
                                            />
                                        </a>
                                    </span>
                                </summary>

                                <ul>
                                    <For each={person.references}>
                                        {(reference) => (
                                            <li>
                                                <span class="inline-flex items-center">
                                                    <a
                                                        href={
                                                            reference.episodeNumber
                                                        }
                                                    >
                                                        {' '}
                                                        {reference.name}{' '}
                                                    </a>
                                                    <a
                                                        class="flex ml-1"
                                                        href={
                                                            reference.episodeUrl
                                                        }
                                                    >
                                                        {' '}
                                                        <img
                                                            src="/gag.png"
                                                            alt="gag"
                                                        />{' '}
                                                    </a>{' '}
                                                </span>
                                            </li>
                                        )}
                                    </For>
                                </ul>
                            </details>
                        )}
                    </For>
                </section>

                <section class="mt-10">
                    <h3 class="text-xl font-semibold">Ereignisse</h3>
                </section>
            </article>
        </>
    )
}
