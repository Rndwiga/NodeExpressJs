# NodeExpressJs
### About
This is a broiler plate for anyone who wants to get started in building API centric application using latest NodeJs and Express application.

## Packages Included (Important)

* Expressjs
* winston
* helmet
* mongoose
* winston-daily-rotate-file
* cors
* compression
* morgan
* jsonwebtoken
* bcryptjs
* dotenv
* faker

### Features
The application is closely modeled around NodeJs functionality with the packages highlghted above being required to secure and make the application more robust
in terms of logging, security, and reporting. In addition to this, there is custom SDKs that are production ready will be added with time as the project grows.

### How-to
To understand how to configure the application, kindly look at each of the included package documentation. What is given here is just but start-up to make it easy to prototype and build production ready application within the shortest time possible.

### AOB

#### To activate pagination, attach the appropriate methods provided
/api/users?page=1&size=5
/api/users?size=5: using default value for page
/api/users?first_name=data&page=1&size=3: pagination & filter by first_name containing ‘data’
/api/users/active?page=2: pagination & filter by ‘active’ status
