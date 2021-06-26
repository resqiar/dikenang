export type UserProfileType = {
	id: string
	email: string
	username: string
	avatar_url: string
	bio: string
	partnership?: {
		id: string
	} | null
}
