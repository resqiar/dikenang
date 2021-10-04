import { convertDraftToPlain } from 'convert-draftjs'

export function getReadingTime(draftjsResult: string) {
	const plain = convertDraftToPlain(draftjsResult, {
		includeCounter: true,
	})
	/**
	 * Reading Time Formula
	 * t = total words / 200
	 * example t = 3.45
	 * 3 = minutes
	 * 0.45 * 60 = seconds
	 */
	const readingTime = (plain.words ?? 0) / 200

	return {
		minute: beforeDecimal(readingTime),
		second: afterDecimal(readingTime),
	}
}

function beforeDecimal(n: number) {
	return Math.floor(n)
}

function afterDecimal(n: number) {
	const fraction = parseFloat(`0.${n.toString().split('.')[1]}`)
	return Math.round(fraction * 60)
}
