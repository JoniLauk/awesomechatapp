const mongoose = require('mongoose');

/**
 * Creates mongoose schema for Room model.
 * @param {string} roomId Id for room
 * @param {string} roomName Name of the room
 */
const RoomSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
});

RoomSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    returnableObject.id = object._id;
    delete returnableObject._id;
    return returnableObject;
  },
});

module.exports = mongoose.model('Room', RoomSchema);
