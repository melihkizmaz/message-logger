const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.post('/message', (req, res) => {
  const newMessage =new Message()
  newMessage.from=Number(req.body.sender.username)
  newMessage.to=Number(req.body.receiver_details.username)

  switch (req.body.message_type) {
    case 'chat':
      newMessage.body=req.body.body
      newMessage.type='chat'
      break;
    case 'image':
      newMessage.imageUrl=req.body.media_url
      newMessage.imageCaption=req.body.caption
      newMessage.type='image'
      break;

    case 'ptt':
      newMessage.voiceUrl=req.body.media_url
      newMessage.type='voice'
      break;
  }

  Message.create(newMessage)
  res.send('Message saved')
})

module.exports = router;
