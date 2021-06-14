import { NextPageContext } from 'next'
import axiosConfig from './axios'

export default async function checkAuth(ctx: NextPageContext) {
	const resp = await axiosConfig.get('/auth/status', {
		headers: { cookie: ctx.req!.headers.cookie },
	})

	if (resp.status === 403) {
		return
	}

	return resp.data
}
