import { For, Show } from "solid-js";

export default function LinkList(props: { links: Array<Person | GagEvent> }) {

  function onDetailsToggle(event: Event) {
    const details = event.target as HTMLDetailsElement;
    if (details.open) {
      details.querySelector("svg")!.classList.add("rotate-90");
    } else {
      details.querySelector("svg")!.classList.remove("rotate-90");
    }
  }

  return <>

    <For each={props.links}>
      {(person) => (
        <>
          <details class="text-lg ml-2" ontoggle={onDetailsToggle}>
            <summary class="list-none flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span class="inline-flex items-center">
                {person.name}
                <Show when={person.wikipediaUrl}>
                  <a
                    title="Link zu Wikipedia"
                    class="flex ml-1"
                    href={person.wikipediaUrl}
                  >
                    <img
                      src="/wikipedia.svg"
                      alt="wikipedia"
                    />
                  </a>
                </Show>
              </span>
            </summary>

            <ul class="ml-4">
              <For each={person.references}>
                {(reference) => (
                  <li>
                    <a href={reference.episodeNumber}>
                      {reference.name}
                    </a>
                    <a class="ml-1" href={reference.episodeUrl} title="Link zu geschichte.fm">
                      <img class="inline" src="/gag.png" alt="gag" />
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </details>
        </>
      )}
    </For>

  </>

}
