
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

  // #swagger.tags=['Contacts']

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

  // #swagger.tags=['Contacts']

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

const createUser = async (req, res) => {

  // #swagger.tags=['Contacts']

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }

  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while creating the user.')
  }
}

const updateUser = async (req, res) => {

  // #swagger.tags=['Contacts']

  const userId = new ObjectId(req.params.id);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }

  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne(
    { _id: userId },
    user
  );

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while updating the user.')
  }
}

const deleteUser = async (req, res) => {

  // #swagger.tags=['Contacts']
  
  const userId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while deleting the user.')
  }
}

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
}