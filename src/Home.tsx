import { A } from '@solidjs/router'
import EpisodeSelector from './EpisodeSelector'

export default function Home() {
    return (
        <section class="fl-container text-center flex flex-col items-center sm:mt-[20vh] justify-center mb-20">
            <h1 class="text-5xl font-semibold mb-8 text-gagyellow">
                Geschichten aus der Geschichte
            </h1>
            <h2 class="text-5xl">Flickenteppich</h2>
            <div class="my-12">
                <EpisodeSelector></EpisodeSelector>
            </div>
            <p class="text-gagyellow">
                <A href="/projektinfo#how-to-help">Wie ihr diesem Projekt helfen könnt</A>
            </p>
        </section>
    )
}
