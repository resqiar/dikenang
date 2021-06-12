export type DummyPostType = [
	{
		id: string
		caption: string
		author: string
		timestamp: string
		summary: {
			upvotes: number
			downvotes: number
			comments: number
		}
		attachments?: {
			type?: string
			path?: string
		}
	}
]
