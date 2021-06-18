import { NextPageContext } from 'next'
import axiosConfig from './axios'

export default async function checkAuth(ctx: NextPageContext) {
	try {
		const resp = await axiosConfig.get('/auth/status', {
			headers: { cookie: ctx.req!.headers.cookie },
		})
		return resp.data
	} catch (e) {
		return
	}
}
