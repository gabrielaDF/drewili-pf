const { Router } = require('express')
const productRouter = require ('./productRouter')
const userRouter = require ('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const salesCartRouter = require("./salesCartRouter")
const commentRouter = require("./commentRouter")
const authRouter = require('./auth')
const filterRouter = require('./filterRouter')
const colorRouter = require("./colorRouter")

const router = Router()

router.use("/color", colorRouter)
router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/category", categoryRouter)
router.use("/brand", brandRouter)
router.use("/salescart", salesCartRouter)
router.use("/comment", commentRouter)
router.use("/auth", authRouter)
router.use('/filterby', filterRouter)

module.exports = router