// @ts-ignore ignoring ts compiler to not complain about draftail types
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'
import styled from 'styled-components'
import PrismDecorator from './PrismDecorator'
import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import '@draft-js-plugins/linkify/lib/plugin.css'

interface Props {
	onChangeCallback?: (content: any) => void
	readOnly?: boolean
	maxHeight?: string
	mobileMaxHeight?: string
	initialState?: string
	margin?: string
	padding?: string
}

const linkifyPlugin = createLinkifyPlugin({
	target: '_blank',
})

export default function RichTextEditor(props: Props) {
	return (
		<RichTextEditorWrapper
			maxHeight={props.maxHeight}
			mobileMaxHeight={props.mobileMaxHeight}
			margin={props.margin}
			padding={props.padding}
		>
			<DraftailEditor
				onSave={
					props.onChangeCallback ? props.onChangeCallback : undefined
				}
				rawContentState={
					props.initialState ? JSON.parse(props.initialState) : null
				}
				placeholder={
					!props.readOnly
						? 'What interests you to share this day?'
						: ''
				}
				// Makes it easier to write automated tests retrieving the content.
				stateSaveInterval={50}
				enableHorizontalRule={!props.readOnly ? true : false}
				readOnly={!props.readOnly ? false : true}
				enableLineBreak={!props.readOnly ? true : false}
				showUndoControl={!props.readOnly ? true : false}
				showRedoControl={!props.readOnly ? true : false}
				spellCheck={!props.readOnly ? true : false}
				decorators={[
					new PrismDecorator({ defaultLanguage: 'javascript' }),
				]}
				blockTypes={
					!props.readOnly
						? [
								{ type: BLOCK_TYPE.HEADER_ONE },
								{ type: BLOCK_TYPE.HEADER_TWO },
								{ type: BLOCK_TYPE.HEADER_THREE },
								{ type: BLOCK_TYPE.HEADER_FOUR },
								{ type: BLOCK_TYPE.HEADER_FIVE },
								{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
								{ type: BLOCK_TYPE.ORDERED_LIST_ITEM },
								{ type: BLOCK_TYPE.CODE },
								{ type: BLOCK_TYPE.BLOCKQUOTE },
						  ]
						: undefined
				}
				inlineStyles={
					!props.readOnly
						? [
								{ type: INLINE_STYLE.BOLD },
								{ type: INLINE_STYLE.ITALIC },
								{ type: INLINE_STYLE.UNDERLINE },
								{ type: INLINE_STYLE.STRIKETHROUGH },
								{ type: INLINE_STYLE.SUPERSCRIPT },
								{ type: INLINE_STYLE.SUBSCRIPT },
						  ]
						: undefined
				}
				plugins={[linkifyPlugin]}
			/>
		</RichTextEditorWrapper>
	)
}

const RichTextEditorWrapper = styled.div<{
	maxHeight?: string
	mobileMaxHeight?: string
	margin?: string
	padding?: string
}>`
	width: 100%;
	height: 100%;
	margin: ${(props) => props.margin || undefined};
	padding: ${(props) => props.padding || undefined};
`
