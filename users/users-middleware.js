const jwt = require("jsonwebtoken")

function restrict(role) {
	const roleScale = ["basic", "admin"]

	return async (req, res, next) => {
		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "Invalid credentials",
				})
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "Invalid credentials",
					})
				}

				if (role && roleScale.indexOf(decoded.userRole) < roleScale.indexOf(role)) {
					return res.status(403).json({
						message: "You are not allowed here",
					})
				}

				// make the token's payload available to other middleware functions
				req.token = decoded

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}