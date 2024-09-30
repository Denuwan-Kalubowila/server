const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require('dotenv').config()

const genAI = new GoogleGenerativeAI("AIzaSyA6Bkhpmh6MY2-whmHejhRUsnA286YsExI");

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

exports.genaiServices={
  async checkByImageAsync(image,mimetype){
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `
    Carefully examine the image provided. 
    Begin by assessing its contents and identify any potentially harmful elements to human health. 
    Next, conduct a thorough analysis of the nutritional components present. 
    Finally, determine whether the depicted items align with the principles of a healthy lifestyle
    `;
    const imageParts = [
      fileToGenerativePart(image, mimetype),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return text
  },
  async recipeAssync(ingredients,cuisine,dietaryRestrictions,mealType){
    const model= genAI.getGenerativeModel({model:"gemini-pro"})
    const prompt=`
    Craft a simple yet nutritious recipe tailored for busy individuals. 
    Utilize the provided ingredients (${ingredients}) to create a meal that aligns with ${cuisine} cuisine, ${dietaryRestrictions} restrictions, and ${mealType}. 
    The goal is to offer a quick and easy-to-prepare dish that ensures essential nutrients are not overlooked amidst a hectic schedule.
    `
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    return text 
  }
}
