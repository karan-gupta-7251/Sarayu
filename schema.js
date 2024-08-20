// const joi = require("joi");

// module.exports.listingschema = joi.object({
//   listing: joi
//     .object({
//       title: joi.string().required(),
//       description: joi.string().required(),
//       price: joi.number().required().min(0),
//       location: joi.string().required(),
//       country: joi.string().required(),
//       image: joi.string().allow("", null),
//     })
//     .required(),
// });

// module.exports.reviewSchema = joi.object({
//   review: joi
//     .object({
//       rating: joi.number().required().min(1).max(5),
//       comment: joi.string().required(),
//     })
//     .required(),
// });
const Joi = require("joi");

let listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
    }).required(),
})
let reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required()


    }).required()
})
module.exports= {reviewSchema , listingSchema};