import styled from 'styled-components'
import Meta from '../components/meta/Meta'
import DikenangLogo from '../components/logo/DikenangLogo'

export default function MaintenancePage() {
	return (
		<MaintenantePageWrapper>
			{/* Head Meta Property */}
			<Meta title="Maintenance in progress" />

			<LogoWrapper>
				<DikenangLogo />
			</LogoWrapper>

			<MaintenancePageBodyWrapper>
				<BodyText>Offline for Maintenance</BodyText>
				<BodySubText>
					This application is undergoing maintenance right now. Please
					check back later.
				</BodySubText>
			</MaintenancePageBodyWrapper>
		</MaintenantePageWrapper>
	)
}

const MaintenantePageWrapper = styled.div`
	height: 100%;
`

const LogoWrapper = styled.div`
	margin: 8px;
	padding: 0px 10%;

	// how mobile should behave
	@media (max-width: 600px) {
		justify-content: space-between;
		padding: 0px 12px 0px 24px;
	}
`

const MaintenancePageBodyWrapper = styled.div`
	padding: 18px;
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
`

const BodyText = styled.p`
	color: var(--font-white-800);
	text-align: center;
	font-size: 38px;
	font-weight: bold;

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 24px;
	}
`
const BodySubText = styled.p`
	color: var(--font-white-700);
	text-align: center;
	font-size: 16px;

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 12px;
	}
`
