import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import { useSpring, animated } from 'react-spring'
import { useDebounce } from 'use-debounce'

import { SearchOutlined } from '@material-ui/icons'
import useAutocomplete from '@material-ui/lab/useAutocomplete'

export default function AutoCompleteSearch() {
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
	const [isMyInputFocused, setIsMyInputFocused] = useState<boolean>(false)
	/**
	 * Store input from user here and use debounce hook
	 * to delay about 1 second when user stop typing
	 * (useful to reduce API calls and make search efficient).
	 */
	const [inputValue, setInputValue] = useState<string | undefined>()
	const [debouncedValue] = useDebounce<string | undefined>(inputValue, 1000)

	useEffect(() => {
		if (!debouncedValue || debouncedValue.length === 0) return
		alert(debouncedValue)
	}, [debouncedValue])

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
		clearOnBlur: false,
		disableClearable: true,
		onInputChange: (_e, value) => setInputValue(value),
	})

	// react-spring fade animation
	const fadeAnimation = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		leave: { opacity: 0 },
		reset: true,
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
				<AutoCompleteItemWrapper style={fadeAnimation}>
					<AutoCompleteListItemWrapper {...getListboxProps()}>
						{groupedOptions.filter(
							(value) => value.type === 'community'
						).length > 0 ? (
							<ListTitle>Members</ListTitle>
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
const AutoCompleteItemWrapper = styled(animated.div)`
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
