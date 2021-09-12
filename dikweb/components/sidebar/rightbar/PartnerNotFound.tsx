import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons'

export default function PartnerNotFound() {
	return (
		<Wrapper>
			<IconWrapper>
				<FontAwesomeIcon
					style={{ width: '80px', height: '80px' }}
					icon={faPersonBooth}
				/>
			</IconWrapper>

			<TextWrapper>
				<TextElement>You don't have partner yet</TextElement>
				<SubTextElement>
					Partner general information will be available here
				</SubTextElement>
			</TextWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 180px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: 2px dashed var(--font-white-200);
`
const IconWrapper = styled.div`
	display: flex;
	padding: 8px;
	color: var(--font-white-200);
	align-items: center;
	justify-content: center;
`
const TextWrapper = styled.div`
	padding-top: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`
const TextElement = styled.p`
	color: var(--font-white-400);
	font-weight: bold;
`
const SubTextElement = styled.p`
	color: var(--font-white-400);
	font-size: 12px;
`
