const { genaiServices } = require("../genai-services/gemini");
const path =require('node:path')

exports.foodServices={
    async healthyAnaliyzer(req,res){
        const filename = req.file.filename
        const filemime =req.file.mimetype
        if (!req.file) {
            res.status(413).send(`File not uploaded!, Please attach jpeg file under 5 MB`);
            return;
        }
        const analyzeText=await genaiServices.checkByImageAsync(path.join(__dirname,`../../uploads/${filename}`),filemime)
        res.send(analyzeText)
    },
    async genarateHealthyRecipe(req,res){
        const {ingredients,cuisine,dietaryRestrictions,mealType} = req.body
        console.log(ingredients,cuisine,dietaryRestrictions,mealType)
        
        if (!req.body) {
            res.status(413).send(`Data not found`);
            return;
        }
        const recipetext=await genaiServices.recipeAssync(ingredients,cuisine,dietaryRestrictions,mealType)
        console.log(recipetext)
        res.send(recipetext)
    }
}