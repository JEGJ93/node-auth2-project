const JWT = require("jsonwebtoken")
const roles = ["basic", "admin"]


function restrict(role) {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(401).json({
                    message: "Invalid credentials"
                })
            }
            JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        message: "Invalid crdentials"
                    })
                }
                if(role && roles.indexOf(decoded.user.role) < roles.indexOf(role)) {
                    return res.status(401).json({
                        message: "Not Authorized",
                        decoded
                    })
                }

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