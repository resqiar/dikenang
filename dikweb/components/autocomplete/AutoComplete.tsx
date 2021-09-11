import { useState } from 'react'
import styled from 'styled-components'

import { SearchOutlined } from '@material-ui/icons'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import Icons from '../icons/Icons'

export default function AutoCompleteSearch() {
	// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
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
		options: top100Films,
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
				<ul {...getListboxProps()}>
					{groupedOptions.map((option, index) => (
						<li {...getOptionProps({ option, index })}>
							{option.title}
						</li>
					))}
				</ul>
			) : null}
		</HeaderSearchInput>
	)
}

const HeaderSearchInput = styled.div`
	width: 100%;
	padding: 0px 18px;

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
