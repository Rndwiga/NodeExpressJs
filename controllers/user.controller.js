const db = require("../models");
const debug = require('debug');
    const log = debug('app:route:user')
    const debugName = 'Debugging user module'
const Promise = require('promise');
const fs = require('fs').promises;
const checkAuth = require('../middleware/check-auth'); 
const userModel = db.userModel;
const Op = db.Sequelize.Op;

//Adding pagination support
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  log('validating request')
  if (!req.body.first_name || !req.body.last_name || !req.body.mobile_number || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    mobile_number: req.body.mobile_number,
    email: req.body.email,
    password: req.body.password,
    is_active: req.body.is_active ? req.body.is_active : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;
  
    userModel.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  userModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  userModel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  userModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
    userModel.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
};

// Find all active Users
exports.findAllActive = (req, res) => {

    userModel.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Retrieve all Users from the database paginated.
exports.findAllPaginate = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  userModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  userModel.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

function readFile(dataObject){
  return new Promise(function(resolve, reject){
      fs.readFile('users.json').then(function(data){
          let users = JSON.parse(data);
          resolve(users);
      }).catch(function(error){
          console.log(error);
          reject(error);
      });
  });
}