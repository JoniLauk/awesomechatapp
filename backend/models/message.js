const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

/**
 * Creates mongoose schema for Message model.
 * @param {string} roomId Id of the room where message was sent
 * @param {string} content Content of the message
 * @param {string} date Time when message was sent
 * @param {string} user User who sent the message
 */
const messageSchema = new mongoose.Schema({
  roomId: String,
  content: String,
  date: { type: String, default: Date.now },
  user: String,
});

messageSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    returnableObject.id = object._id.toString();
    delete returnableObject._id;
    return returnableObject;
  },
});

// messageSchema.plugin(uniqueValidator);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
