const {Router} = require('express')
const postUserHandler = require('../handlers/User/postUserHandler')
const getUserHandler = require('../handlers/User/getUserHandler')
const userSoftDeleteHandler = require('../handlers/User/deleteUserHandler')
const putUserHandler = require ('../handlers/User/putUserHandler')


const router = Router()

router.get("/", getUserHandler)
router.post("/", postUserHandler)
router.put("/:id", putUserHandler)
router.delete("/:id", userSoftDeleteHandler)

module.exports = router