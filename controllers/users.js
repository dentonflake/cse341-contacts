
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

  try {

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .find();
    
    const users = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(users);

  } catch (err) {

  }
  
}

const getSingle = async (req, res) => {

  try {

    const _id = new ObjectId(req.params.id)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .find({ _id });
    
    const users = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(users[0]);

  } catch (err) {

  }

}

module.exports = {
  getAll,
  getSingle
}