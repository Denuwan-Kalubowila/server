const express = require('express')
const upload = require('../upload')
const { foodServices } = require('../services/food-services/foods')
const router= express.Router()

router.post('/check',upload.single('file'),foodServices.healthyAnaliyzer)
router.post('/recipe',foodServices.genarateHealthyRecipe)

module.exports=router 