const mongoose = require('mongoose');

/**
 * Creates mongoose schema for Room model.
 * @param {string} roomId Id for room
 * @param {string} roomName Name of the room
 */
const roomSchema = new mongoose.Schema({
  room: String,
  roomName: String,
  name: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

roomSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    returnableObject.id = object._id.toString();
    delete returnableObject._id;
    return returnableObject;
  },
});

module.exports = mongoose.model('Room', roomSchema);
