import { For, Show } from "solid-js";

export default function LinkList(props: { links: Array<Person | GagEvent> }) {
  return <>

    <For each={props.links}>
      {(person) => (
        <details class="text-lg ml-2">
          <summary>
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
      )}
    </For>

  </>

}
