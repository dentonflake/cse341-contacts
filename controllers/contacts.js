
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

  try {

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find();
    
    const contacts = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(contacts);

  } catch (err) {

  }
  
}

const getSingle = async (req, res) => {

  try {

    const _id = new ObjectId(req.params.id)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find({ _id });
    
    const contacts = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(contacts[0]);

  } catch (err) {

  }

}

module.exports = {
  getAll,
  getSingle
}