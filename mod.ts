import { serveTls } from 'https://deno.land/std@0.162.0/http/server.ts'
import { serveFile } from 'https://deno.land/std@0.162.0/http/file_server.ts'

const STATIC_FILES = ['styles.css', 'matrix-3D.js']

serveTls(
	(request) => {
		const pathname = new URL(request.url).pathname.slice(1)

		if (STATIC_FILES.includes(pathname)) {
			return serveFile(request, pathname)
		}

		return serveFile(request, 'index.html')
	},
	{ certFile: 'cert.pem', keyFile: 'key.pem' },
)
