const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { orderId, to, from, quantity, address, transporter } = req.body;
    const message = new Message({ orderId, to, from, quantity, address, transporter });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Reply to a message
router.post('/reply', async (req, res) => {
  try {
    const { orderId, price } = req.body;
    const message = await Message.findOne({ orderId });
    if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      message.price = price;
      await message.save();
      res.status(200).json({ message: 'Reply sent successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

module.exports = router;

