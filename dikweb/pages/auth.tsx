import Meta from '../components/meta/Meta'
import AuthHeader from '../components/header/AuthHeader'
import styled from 'styled-components'
import AuthButton from '../components/button/AuthButton'

import {
	faGoogle,
	faTwitter,
	faGithub,
	faDiscord,
} from '@fortawesome/free-brands-svg-icons'

export default function AuthPage() {
	return (
		<div>
			{/* Head Meta Property */}
			<Meta title="Login — dikenang" />

			{/* Auth Page Header */}
			<AuthHeader />

			{/* Body */}
			<AuthBodyWrapper>
				<AuthBodyCard>
					<AuthCardTextWrapper>
						<AuthCardTextHeading>Welcome</AuthCardTextHeading>
						<AuthCardTextSub>
							By logging in you accept our{' '}
							<AuthCardTextLink
								href="/misc/privacypolicy.html"
								target="_blank"
							>
								Privacy Policy
							</AuthCardTextLink>{' '}
							and{' '}
							<AuthCardTextLink
								href="/misc/termsandconditions.html"
								target="_blank"
							>
								Terms of Conditions.
							</AuthCardTextLink>
						</AuthCardTextSub>
					</AuthCardTextWrapper>

					{/* Auth Button */}
					<AuthCardButtonWrapper>
						{/* Google */}
						<AuthButton fontAwesomeIcon={faGoogle}>
							Google
						</AuthButton>

						{/* Twitter */}
						<AuthButton fontAwesomeIcon={faTwitter}>
							Twitter
						</AuthButton>

						{/* Github */}
						<AuthButton fontAwesomeIcon={faGithub}>
							GitHub
						</AuthButton>

						{/* Discord */}
						<AuthButton fontAwesomeIcon={faDiscord}>
							Discord
						</AuthButton>
					</AuthCardButtonWrapper>
				</AuthBodyCard>
			</AuthBodyWrapper>
		</div>
	)
}

const AuthBodyWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 600px) {
		height: 100vh;
	}
`
const AuthBodyCard = styled.div`
	height: fit-content;
	width: 400px;
	margin: 36px 0px 0px 0px;
	padding: 18px 36px;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	background-color: var(--background-dimmed-500);

	@media (max-width: 600px) {
		height: 102%; // 102% when it is scrolled up; border radius will be occupied
		width: 100%;
		margin: 0px;
		border-top-right-radius: 25px;
		border-top-left-radius: 25px;
		padding: 18px 24px;
		z-index: 1;
	}
`
const AuthCardTextWrapper = styled.div`
	padding: 8px 0px;
`
const AuthCardTextHeading = styled.h1`
	padding: 8px 0px;
	color: var(--font-white-800);
`
const AuthCardTextSub = styled.p`
	font-size: 14px;
	color: var(--font-white-700);
	text-align: justify;
`
const AuthCardTextLink = styled.a`
	color: #ff1d1d;

	&:hover {
		text-decoration: underline;
	}
`
const AuthCardButtonWrapper = styled.div``
