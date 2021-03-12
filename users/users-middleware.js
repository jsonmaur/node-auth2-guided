const jwt = require("jsonwebtoken")

const roles = ["basic", "manager", "admin", "super-admin"]

function restrict(role) {
	return async (req, res, next) => {
		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "Invalid credentials",
				})
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				// token didn't verify, something is wrong with it, don't trust it
				if (err) {
					return res.status(401).json({
						message: "Invalid credentials",
					})
				}

				if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
					return res.status(403).json({
						message: "You shall not pass",
					})
				}

				// make the token's payload available to later middleware functions,
				// just in case it's needed for anything
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