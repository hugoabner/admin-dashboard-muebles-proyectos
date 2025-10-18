import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import 'server-only'

export type SessionPayload = {
  userId?: string
  image_url?: string
  expiresAt?: Date
}


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
/** Encrypt session */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

/**
 * @param session
 * @returns 
 */
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}
 
/**crear sesion de usuario y guardarla en cookies */
export async function createSession(userId: string) {
  // 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    // La cookie solo es accesible desde el servidor (no desde JavaScript del cliente), protegiendo contra ataques XSS
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    // Protección CSRF: permite cookies en navegación top-level, pero no en requests cross-site
    sameSite: 'lax',
    // La cookie está disponible en todas las rutas de la aplicación
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}