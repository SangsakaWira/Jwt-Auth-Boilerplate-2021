const express = require("express")
const userController = require("../controller/user")
const middleware = require("../config/middleware")
const router = express.Router()

router.post("/register",middleware.verifyAuthorization,userController.register)
router.post("/login",middleware.verifyAuthorization,userController.login)
router.get("/readById/:id",middleware.verifyAuthorization,userController.readById)

module.exports = router
