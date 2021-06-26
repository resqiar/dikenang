import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '../lib/apollo'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../styles/globals.css'
import '../styles/nprogress.css'

NProgress.configure({
	showSpinner: false,
	speed: 1000,
})

/**
 * NProgress Configs
 * Simply show loading progress at the top
 * When navigating around client-side
 * @see https://nextjs.org/docs/api-reference/next/router
 */
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
	/**
	 * Apollo Configuration
	 * Initialize apollo client on the browser
	 * Wrap up component with ApolloProvider
	 * @see apollo.ts for more
	 */
	const apolloClient = initializeApollo(null)

	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
