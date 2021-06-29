// @ts-ignore ignoring ts compiler to not complain about draftail types
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'
import styled from 'styled-components'
import PrismDecorator from './PrismDecorator'
import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'

interface Props {
	onChangeCallback: (content: any) => void
}

export default function RichTextEditor(props: Props) {
	return (
		<RichTextEditorWrapper>
			<DraftailEditor
				onSave={props.onChangeCallback}
				rawContentState={null}
				placeholder="What interest you to share this day?"
				// Makes it easier to write automated tests retrieving the content.
				stateSaveInterval={50}
				enableHorizontalRule
				enableLineBreak
				showUndoControl
				showRedoControl
				spellCheck
				decorators={[
					new PrismDecorator({ defaultLanguage: 'javascript' }),
				]}
				blockTypes={[
					{ type: BLOCK_TYPE.HEADER_ONE },
					{ type: BLOCK_TYPE.HEADER_TWO },
					{ type: BLOCK_TYPE.HEADER_THREE },
					{ type: BLOCK_TYPE.HEADER_FOUR },
					{ type: BLOCK_TYPE.HEADER_FIVE },
					{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
					{ type: BLOCK_TYPE.ORDERED_LIST_ITEM },
					{ type: BLOCK_TYPE.CODE },
					{ type: BLOCK_TYPE.BLOCKQUOTE },
				]}
				inlineStyles={[
					{ type: INLINE_STYLE.BOLD },
					{ type: INLINE_STYLE.ITALIC },
					{ type: INLINE_STYLE.UNDERLINE },
					{ type: INLINE_STYLE.STRIKETHROUGH },
					{ type: INLINE_STYLE.SUPERSCRIPT },
					{ type: INLINE_STYLE.SUBSCRIPT },
				]}
			/>
		</RichTextEditorWrapper>
	)
}

const RichTextEditorWrapper = styled.div`
	width: 100%;
	height: 100%;
	max-height: 31rem;

	@media (max-width: 600px) {
		max-height: 29.5rem;
	}
`
