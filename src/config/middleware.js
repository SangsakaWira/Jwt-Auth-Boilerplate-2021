require("dotenv").config()

function verifyAuthorization(req, res, next) {
	const token = req.headers['x-access-token']
	if (!token)
		return res
			.status(403)
			.send({ auth: false, message: 'No token provided!' })

    if(token === process.env.KEY){
        next()
    }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
    }
}

module.exports = {
    verifyAuthorization
}