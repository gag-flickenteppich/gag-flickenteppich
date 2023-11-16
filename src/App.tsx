import { onMount } from 'solid-js'
import { EpisodesRepository } from './Storage'
import { NavBar } from './NavBar'
import { lazy } from 'solid-js'
import { useRoutes } from '@solidjs/router'

const EpisodeRoute = lazy(() => import('./EpisodeRoute.tsx'))
const ProjectInfo = lazy(() => import('./ProjectInfo.mdx'))
const Home = lazy(() => import('./Home.tsx'))

const routes = [
  { path: '/', component: Home },
  { path: '/episode/:id', component: EpisodeRoute },
  { path: '/projektinfo', component: ProjectInfo },
]

function App() {
  const Routes = useRoutes(routes)
  onMount(async () => {
    await EpisodesRepository.getEpisodes()
  })

  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}

export default App
