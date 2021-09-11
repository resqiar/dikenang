import { useState } from 'react'
import styled from 'styled-components'

import { SearchOutlined } from '@material-ui/icons'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import Icons from '../icons/Icons'

export default function AutoCompleteSearch() {
	// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
	const options = [
		{ title: 'Alexander', type: 'community' },
		{ title: 'Brotherhood1234', type: 'community' },
		{ title: 'Hence Fighter xx12', type: 'community' },
		{ title: 'The Hunter Knight', type: 'community' },
		{ title: 'Angry Men', type: 'community' },
		{ title: 'Schindler', type: 'community' },
		{ title: 'A lof effort put here', type: 'memories' },
		{ title: 'Holland 1945', type: 'memories' },
		{ title: 'Firefighters', type: 'memories' },
		{ title: 'Boots of the loops', type: 'memories' },
		{ title: 'Cow', type: 'memories' },
		{ title: '1889', type: 'memories' },
		{ title: 'Massacre', type: 'memories' },
		{ title: 'Liberation 1945', type: 'stories' },
		{ title: 'Dump Truck', type: 'stories' },
		{ title: 'Software Engineering', type: 'stories' },
		{ title: 'Universe Gate', type: 'stories' },
		{ title: '21 Century', type: 'stories' },
	]

	/**
	 * UseState to determine if input is focused or not.
	 * This is useful to create a great visual representation
	 * of what is going on to the user.
	 */
	const [isMyInputFocused, setIsMyInputFocused] = useState(false)

	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		id: 'searchHeaderAutoComplete',
		options: options,
		autoHighlight: true,
		onOpen: () => setIsMyInputFocused(true),
		onClose: () => setIsMyInputFocused(false),
		getOptionLabel: (option) => option.title,
	})

	return (
		<HeaderSearchInput>
			<InputFieldWrapper {...getRootProps()}>
				<InputFieldIcon>
					<Icons
						Icon={SearchOutlined}
						hasIconButton={false}
						color={
							isMyInputFocused
								? 'var(--font-white-700)'
								: undefined
						}
					/>
				</InputFieldIcon>
				<SearchInputElement
					placeholder="Search for memories, partners, and stuff"
					type="text"
					{...getInputProps()}
				/>
			</InputFieldWrapper>

			{groupedOptions.length > 0 ? (
				<AutoCompleteItemWrapper>
					<AutoCompleteListItemWrapper {...getListboxProps()}>
						{groupedOptions.filter(
							(value) => value.type === 'community'
						).length > 0 ? (
							<ListTitle>Trending Communities</ListTitle>
						) : undefined}
						{groupedOptions
							.filter((value) => value.type === 'community')
							.map((option, index) => (
								<AutoCompleteList
									{...getOptionProps({ option, index })}
									onClick={() => alert(option.title)}
								>
									{option.title}
								</AutoCompleteList>
							))}

						{groupedOptions.filter(
							(value) => value.type === 'memories'
						).length > 0 ? (
							<ListTitle>Memories</ListTitle>
						) : undefined}
						{groupedOptions
							.filter((value) => value.type === 'memories')
							.map((option, index) => (
								<AutoCompleteList
									{...getOptionProps({ option, index })}
									onClick={() => alert(option.title)}
								>
									{option.title}
								</AutoCompleteList>
							))}

						{groupedOptions.filter(
							(value) => value.type === 'stories'
						).length > 0 ? (
							<ListTitle>Stories</ListTitle>
						) : undefined}
						{groupedOptions
							.filter((value) => value.type === 'stories')
							.map((option, index) => (
								<AutoCompleteList
									{...getOptionProps({ option, index })}
									onClick={() => alert(option.title)}
								>
									{option.title}
								</AutoCompleteList>
							))}
					</AutoCompleteListItemWrapper>
				</AutoCompleteItemWrapper>
			) : null}
		</HeaderSearchInput>
	)
}

const HeaderSearchInput = styled.div`
	width: 100%;
	padding: 0px 18px;
	position: relative;

	// how mobile should behave
	@media (max-width: 600px) {
		display: none;
	}
`
const InputFieldWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0px 8px;
	background: var(--background-dimmed-300);
	border-radius: 8px;
	box-shadow: var(--box-shadow);
`

const InputFieldIcon = styled.div`
	padding: 3px 4px 2px 8px;
	margin-bottom: -2px;
`

const SearchInputElement = styled.input`
	font-family: var(--font-family);
	width: 100%;
	font-size: 14px;
	font-weight: 300;
	color: var(--font-white-800);
	background: transparent;
	border: none;
	padding: 9px;
	outline: none;
`
const AutoCompleteItemWrapper = styled.div`
	position: absolute;
	top: 10;
	right: 0;
	left: 0;
	z-index: 999999;
	margin: 0px 5%;
	padding: 12px 18px;
	border: var(--border);
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
	box-shadow: var(--box-shadow);
	background: var(--background-dimmed-500);
`

const AutoCompleteListItemWrapper = styled.div``
const AutoCompleteList = styled.button`
	padding: 8px;
	cursor: pointer;
	color: var(--font-white-600);
	outline: none;
	background: none;
	border: none;
	font-family: var(--font-family);
	font-size: 14px;

	&:hover {
		background: var(--background-dimmed-300);
	}
`

const ListTitle = styled.p`
	font-weight: bold;
	color: var(--font-white-600);
`
