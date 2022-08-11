const {body}=require('express-validator')

const textBodyValidator=[
  body('body').notEmpty().withMessage('body field is required'),
  body('to').notEmpty().withMessage('to field is required')]

const imageBodyValidator=[
  body('to').notEmpty().withMessage('to field is required'),
  body('imageUrl').notEmpty().withMessage('ImaimageUrlge field is required'),
  body('imageCaption').notEmpty().withMessage('imageCaption field is required'),
  body('filename').notEmpty().withMessage('filename field is required')]

  module.exports={textBodyValidator,imageBodyValidator}
