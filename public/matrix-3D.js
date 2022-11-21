// My version of https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
function computeAdjugate(matrix) {
	return [
		matrix[4] * matrix[8] - matrix[5] * matrix[7],
		matrix[2] * matrix[7] - matrix[1] * matrix[8],
		matrix[1] * matrix[5] - matrix[2] * matrix[4],
		matrix[5] * matrix[6] - matrix[3] * matrix[8],
		matrix[0] * matrix[8] - matrix[2] * matrix[6],
		matrix[2] * matrix[3] - matrix[0] * matrix[5],
		matrix[3] * matrix[7] - matrix[4] * matrix[6],
		matrix[1] * matrix[6] - matrix[0] * matrix[7],
		matrix[0] * matrix[4] - matrix[1] * matrix[3],
	]
}

function multiplyMatricies(matrix1, matrix2) {
	const c = Array(9)

	for (let i = 0; i != 3; ++i) {
		for (let j = 0; j != 3; ++j) {
			let cij = 0

			for (let k = 0; k != 3; ++k) {
				cij += matrix1[3 * i + k] * matrix2[3 * k + j]
			}

			c[3 * i + j] = cij
		}
	}

	return c
}

function multiplyMatrixVector(matrix, vector) {
	return [
		matrix[0] * vector[0] + matrix[1] * vector[1] + matrix[2] * vector[2],
		matrix[3] * vector[0] + matrix[4] * vector[1] + matrix[5] * vector[2],
		matrix[6] * vector[0] + matrix[7] * vector[1] + matrix[8] * vector[2],
	]
}

function mapBasisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
	const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1]
	const v = multiplyMatrixVector(computeAdjugate(m), [x4, y4, 1])
	return multiplyMatricies(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}

function general2DProjection(
	x1s,
	y1s,
	x1d,
	y1d,
	x2s,
	y2s,
	x2d,
	y2d,
	x3s,
	y3s,
	x3d,
	y3d,
	x4s,
	y4s,
	x4d,
	y4d,
) {
	const s = mapBasisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s)
	const d = mapBasisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d)
	return multiplyMatricies(d, computeAdjugate(s))
}

export function transform2D(height, width, x1, y1, x2, y2, x3, y3, x4, y4) {
	const t = general2DProjection(
		0,
		0,
		x1,
		y1,
		width,
		0,
		x2,
		y2,
		0,
		height,
		x3,
		y3,
		width,
		height,
		x4,
		y4,
	)

	for (let i = 0; i != 9; ++i) t[i] = t[i] / t[8]

	// prettier-ignore
	return [
		t[0], t[3], 0, t[6],
		t[1], t[4], 0, t[7],
		0, 0, 1, 0,
		t[2], t[5], 0, t[8],
	]
}
