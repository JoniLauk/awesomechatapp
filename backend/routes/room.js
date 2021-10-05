const express = require('express');
const roomRouter = express.Router();
const Room = require('../models/room.js');

/* GET ALL ROOMS */
/**
 * Gets all rooms.
 * @name roomRouter_get_All
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example roomRouter.get('/',
 */
roomRouter.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms.map((room) => room.toJSON()));
  } catch (err) {
    // TODO err handling
    console.log(err);
  }
});

/* GET SINGLE ROOM BY ID */
/**
 * Gets single room by id.
 * @name roomRouter_get_One
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example roomRouter.get('/:id',
 */
roomRouter.get('/:id', async (req, res, next) => {
  const rooms = await Room.findById(req.params.id).populate('users');

  res.json(rooms);
});

/* SAVE ROOM */
/**
 * Saves room.
 * @name roomRouter_post_One
 * @param {string} req Express post request
 * @param {string} res Express post result
 * @example roomRouter.post('/',
 */
roomRouter.post('/', function (req, res, next) {
  Room.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ROOM */
/**
 * Updates selected room room.
 * @name roomRouter_update_One
 * @param {string} req Express put request
 * @param {string} res Express put result
 * @example roomRouter.put('/:id',
 */
roomRouter.put('/:id', function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ROOM */
/**
 * Deletes selected room room.
 * @name roomRouter_delete_One
 * @param {string} req Express delete request
 * @param {string} res Express delete result
 * @example roomRouter.delete('/:id',
 */
roomRouter.delete('/:id', function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = roomRouter;
