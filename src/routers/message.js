const express = require('express')
const axios = require('axios').default
const mongoose = require('mongoose')
const {  validationResult } = require('express-validator');
const Message = require('../models/Message')
const {textBodyValidator, imageBodyValidator} = require('../validator/body.validator')
const router = express.Router()

router.post('/send-text',textBodyValidator,async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw Error(errors.array()[0].msg)

    const body={
      "to":req.body.to,
      "body":req.body.body
    }
    const headers = {headers:{'api-key':process.env.OMNI_KEY}}

    const [response, client] = await Promise.all([
      axios.post(`${process.env.OMNI_BASE}/message/send-text/${process.env.OMNI_WP_CLIENT}`,body,headers),
      axios.get(`${process.env.OMNI_BASE}/user/client/${process.env.OMNI_WP_CLIENT}`,headers).then(r => r.data)
    ]);

    if(response.status===200){
      const message = new Message()
      message.from = Number(client.username);
      message.to = Number(req.body.to);
      message.body = req.body.body;
      message.type = 'chat';
      Message.create(message);


      res.send({
        data: 'OK',
        error: null,
      })
    }else{
      throw new Error('Axios response status is not 200')
    }
  } catch(e) {
    res.send({
      data: null,
      error: e.message
    });
  }
})

router.post('/send-image',imageBodyValidator,async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw Error(errors.array()[0].msg)


    const body={
      "to":req.body.to,
      "media_url":req.body.imageUrl,
      "caption":req.body.imageCaption,
      "filename":req.body.filename
    }
    const url=req.body.imageUrl
    if(!(url.endsWith('.jpg')||url.endsWith('.png')||url.endsWith('.jpeg')))
      throw new Error('Image format must be jpg, png, or jpeg')

    const headers = {headers:{'api-key':process.env.OMNI_KEY}}
    const [response, client] = await Promise.all([
      axios.post(`${process.env.OMNI_BASE}/message/send-media/${process.env.OMNI_WP_CLIENT}`,body,headers),
      axios.get(`${process.env.OMNI_BASE}/user/client/${process.env.OMNI_WP_CLIENT}`,headers).then(r => r.data)
    ]);
    if(response.status===200){
      const message = new Message()
      message.from = Number(client.username);
      message.to = Number(req.body.to);
      message.imageUrl = req.body.imageUrl;
      message.imageCaption = req.body.imageCaption;
      message.type = 'image';
      Message.create(message);

      res.send({
        data: 'OK',
        error: null,
      })
    }else{
      throw new Error('Axios response status is not 200')
    }
  } catch(e) {
    res.send({
      data: null,
      error: e.message
    });
  }
})

router.get('/list', async (req, res) => {
  try {
    Message.find({}, (err, messages) => {
      if (err) throw err;
      res.send({
        data: messages,
        error: null,
      })
    })

  } catch (error) {
    res.send({
      data: null,
      error: error.message
    });
  }
})

router.get('/list/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Message.find({_id:id}, (err, messages) => {
      if (err) throw err;
      res.send({
        data: messages,
        error: null,
      })
    })

  } catch (error) {
    res.send({
      data: null,
      error: error.message
    });
  }
})

module.exports = router;
