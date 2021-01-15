const jwt = require("jsonwebtoken")

const roles = ["basic", "admin"]

function restrict(role = "basic") {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				// allow admins to access "basic" routes, but not the other way around
				if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
					return res.status(403).json({
						message: "You are not allowed here",
					})
				}

				// attach the decoded payload to the request so we can use the data later
				req.token = decoded

				// token has been verified
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