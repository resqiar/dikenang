export type UserProfileType = {
	id: string
	email: string
	fullname: string
	username: string
	avatar_url: string
	bio: string
	relationship?: {
		id: string
	} | null
}
