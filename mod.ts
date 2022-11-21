import { serveTls } from 'https://deno.land/std@0.165.0/http/server.ts'
import { serveFile } from 'https://deno.land/std@0.165.0/http/file_server.ts'

const STATIC_FILES = [
	'styles.css',
	'matrix-3D.js',
	'rectangle.js',
	'permissions.js',
] // as const

serveTls(
	(request) => {
		const pathname = new URL(request.url).pathname.slice(1)

		console.log(pathname)

		if (STATIC_FILES.includes(pathname)) {
			return serveFile(request, `public/${pathname}`)
		}

		return serveFile(request, 'public/index.html')
	},

	{ certFile: 'certificate.pem', keyFile: 'key.pem' },
)
