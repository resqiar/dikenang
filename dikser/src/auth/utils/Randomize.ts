import { nanoid } from 'nanoid'

export default function Randomize(input?: string) {
	/**
	 * Generate random string characters
	 * @Usage mostly to generate new user's username
	 * if there is input => append; input + 12 random char
	 * if there is no input => 15 random char
	 *
	 * @Example with input => 'res_AshUWJsxaWsn'
	 * @Example without input => 'AshUWJsxaWsn_Ae"
	 */
	if (!input) return nanoid(15)
	return `${input}_${nanoid(12)}`
}
