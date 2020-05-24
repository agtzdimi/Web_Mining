"use strict";
const shell = require("shelljs");

const { mongoURI } = require("../bin/www");
// Connection URL
const MongoDbHelper = require("./MongoDbHelper");
console.log(mongoURI);
let mongoDbHelper = new MongoDbHelper(mongoURI);

// start connection
mongoDbHelper.start(() => {
  console.log("mongodb ready");
});

// Example Usage

// mongoDbHelper
//     .collection('users')
//     .find()
//     .then(results => {

//       if (results === null) {
//         return Promise.reject('no such token');
//       }
//       userList = results.map((user, index) => {
//         return ({
//           key: user._id,
//           fullName: user.fullName,
//           role: user.role,
//           email: user.emails[0].address,
//           image: user.profile.image,
//         });
//       });
//     })
//     .then(() => {
//       res.json({ userList: userList });
//     })
//     .catch(err => {
//       res.json({ status: 'error', detail: err });
//     });

exports.insertDocument = (req, res) => {
  const instertion = shell.exec("python -V");
  if (instertion.stderr !== "") {
    res.json({
      status: "error"
    });
  } else {
    res.json({
      status: "success",
      data: instertion
    });
  }
};
