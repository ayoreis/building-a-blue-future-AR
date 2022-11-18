export class Rectangle extends DOMRect {
	calculateCut(other) {
		const thisWidth = this.right - this.left
		const thisHeight = this.bottom - this.top
		const otherWidth = other.right - other.left
		const otherHeight = other.bottom - other.top

		// return (
		// 	Math.max(thisWidth, thisHeight) *
		// 		(Math.min(otherHeight, otherWidth) /
		// 			Math.min(thisWidth, thisHeight)) -
		// 	Math.max(otherWidth, otherHeight)
		// )

		const thisAspectRatio = thisWidth / thisHeight
		const otherAspectRatio = otherWidth / otherHeight

		if (thisAspectRatio > otherAspectRatio) {
			return thisWidth * (otherHeight / thisHeight) - otherWidth
		} else {
			return -(thisHeight * (otherWidth / thisWidth) - otherHeight)
		}
	}
}
