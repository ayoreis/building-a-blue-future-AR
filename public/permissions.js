export const IS_IOS = 'requestPermission' in DeviceMotionEvent

export async function requestPermissions() {
	;['granted', 'prompt'].includes(
		(
			await navigator.permissions.query({
				name: 'gyroscope',
			})
		).state,
	)
}

export async function iOSRequestPermissions() {
	await DeviceMotionEvent.requestPermission()
}
