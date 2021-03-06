module.exports = app => {
    const users = require("../controllers/user.controller");
    const { authJwt } = require("../middleware");
  
    var router = require("express").Router();

    router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      
      next();
    });
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/",[authJwt.verifyToken], users.findAll);
  
    // Retrieve all active Users
    router.get("/active", users.findAllActive);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete a Users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);

  };