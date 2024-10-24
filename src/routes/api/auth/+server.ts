import { dev } from '$app/environment'
import { PRIVATE_FIREBASE_ADMIN_KEY } from '$env/static/private'
import type { RequestHandler } from './$types'
import { auth, firestore } from '$lib/firebase/admin.server'

const expiresIn = 1000 * 60 * 60 * 24 * 7
const secure = dev ? '' : 'Secure;'

export const POST = (async ({ request }) => {
	const { token } = await request.json()
	await console.log(PRIVATE_FIREBASE_ADMIN_KEY);
	try {
		const __session = await auth.createSessionCookie(token, {
			expiresIn: 60 * 60 * 24 * 5 * 1000
		})

		saveUser(token)

		return new Response(__session, {
			status: 200,
			headers: {
				'set-cookie': `__session=${__session}; Max-Age=${expiresIn}; Path=/; HttpOnly;;`
			}
		})
	} catch (e) {
		console.log(`auth/server.ts`, e)
	}
	return new Response(null, {
		status: 500
	})
}) satisfies RequestHandler

export const DELETE = (async () => {
	return new Response(null, {
		status: 200,
		headers: {
			'set-cookie': `__session=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
		}
	})
}) satisfies RequestHandler

async function saveUser(token: string) {
	const decodedToken = await auth.verifyIdToken(token)
	const uid = decodedToken.uid
	const user = await auth.getUser(uid)
	firestore
		.collection('users')
		.doc(uid)
		.set({
			uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			metadata: { ...user.metadata },
			customClaims: user.customClaims
		})
}
