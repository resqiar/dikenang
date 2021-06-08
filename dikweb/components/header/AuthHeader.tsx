import DikenangLogo from '../logo/DikenangLogo'
import styled from 'styled-components'
import Icons from '../icons/Icons'

import GitHubIcon from '@material-ui/icons/GitHub'

export default function AuthHeader() {
	return (
		<HeaderWrapper>
			{/* Left Side */}
			<HeaderBrand>
				{/* Brand Logo */}
				<DikenangLogo />
			</HeaderBrand>

			{/* Right side */}
			<HeaderTextWrapper>
				<HeaderText>
					{/* Terms and conditions */}
					<HeaderLinkElement href="/misc/termsandconditions.html">
						Terms & Conditions
					</HeaderLinkElement>

					{/* Privacy policy */}
					<HeaderLinkElement href="/misc/privacypolicy.html">
						Privacy policy
					</HeaderLinkElement>

					{/* Report bug */}
					<HeaderLinkElement
						href="https://github.com/resqiar/dikenang/issues/new/choose"
						target="_blank"
						rel="noopener norefer"
					>
						Report a bug
					</HeaderLinkElement>
				</HeaderText>

				{/* Github */}
				<HeaderLinkElement
					href="https://github.com/resqiar/dikenang"
					target="_blank"
					rel="noopener norefer"
				>
					<Icons
						Icon={GitHubIcon}
						hasIconButton={true}
						color="var(--font-white-700)"
					/>
				</HeaderLinkElement>
			</HeaderTextWrapper>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	background: transparent;
	padding: 2px 10%;
	display: flex;
	min-height: 55px;
	align-items: center;
	justify-content: space-between;

	// how mobile should behave
	@media (max-width: 600px) {
		justify-content: space-between;
		padding: 0px 12px 0px 24px;
	}
`
const HeaderBrand = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1;
`
const HeaderTextWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`
const HeaderText = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;

	@media (max-width: 600px) {
		display: none;
	}
`
const HeaderLinkElement = styled.a`
	font-size: 14px;
	padding: 8px;
	cursor: pointer;
	color: var(--font-white-600);

	&:hover {
		color: var(--font-white-800);
	}
`
