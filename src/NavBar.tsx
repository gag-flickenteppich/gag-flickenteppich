import { A } from '@solidjs/router'
import './Navbar.css'

export function NavBar() {
    return (
        <nav>
            <ul class="flex shadow items-center">
                <li>
                    <A href="/">Startseite</A>
                </li>
                <li>
                    <A href="/projektinfo">Über dieses Projekt</A>
                </li>
            </ul>
        </nav>
    )
}
