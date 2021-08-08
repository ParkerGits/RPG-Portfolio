import '../styles/globals.css'
import { PlayerEventProvider } from '../context/playerEventContext'

function MyApp({ Component, pageProps }) {
	return (
		<PlayerEventProvider>
			<Component {...pageProps} />
		</PlayerEventProvider>
	)
}

export default MyApp
