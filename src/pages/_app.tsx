import '../styles/globals.css'
import { PlayerEventProvider } from '../context/playerEventContext'
import SoundHandler from '../components/SoundHandler'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerEventProvider>
      <SoundHandler />
      <Component {...pageProps} />
    </PlayerEventProvider>
  )
}

export default MyApp
