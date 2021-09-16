import styled from 'styled-components'
import Image from 'next/image'

export default function ProfileBody() {
	return (
		<ProfileBodyWrapper>
			<BannerWrapper>
				<BannerElement
					src={
						'https://images.unsplash.com/photo-1631649171966-60487005da38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
					}
					layout="fill"
					quality={90}
					objectFit="cover"
				/>
				<FadeEffect />
			</BannerWrapper>
		</ProfileBodyWrapper>
	)
}

const ProfileBodyWrapper = styled.div``
const BannerWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
`
const BannerElement = styled(Image)``

const FadeEffect = styled.div`
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	background: rgb(21, 25, 32);
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(0, 0, 0, 0.5) 100%
	);
`
