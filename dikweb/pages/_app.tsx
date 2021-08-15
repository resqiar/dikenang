import { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '../lib/apollo'
import { AppProps } from 'next/dist/shared/lib/router/router'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../styles/globals.css'
import '../styles/nprogress.css'
/**
 * Custom Override styles for RichTextEditor
 * @RichTextEditor @PrismDecorator
 */
import '../styles/richtextstyles.css'
import '../styles/richtextdecorators.css'

/**
 * NProgress Configs
 * Simply show loading progress at the top
 * When navigating around client-side
 * @see https://nextjs.org/docs/api-reference/next/router
 */
NProgress.configure({
	showSpinner: false,
	speed: 1000,
})

function MyApp({ Component, pageProps }: AppProps) {
	/**
	 * Router events now not available when pre-rendering
	 * moving to useEffects instead
	 * see https://github.com/vercel/next.js/blob/canary/docs/upgrading.md#update-usage-of-routerevents
	 */
	useEffect(() => {
		Router.events.on('routeChangeStart', () => NProgress.start())
		Router.events.on('routeChangeComplete', () => NProgress.done())
		Router.events.on('routeChangeError', () => NProgress.done())
	}, [Router])

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
