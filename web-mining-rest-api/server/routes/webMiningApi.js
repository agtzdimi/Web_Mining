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

exports.retrieveData = (req, res) => {
  mongoDbHelper
    .collection("twitter")
    .find({})
    .then(twitter => {
      mongoDbHelper
        .collection("instagram")
        .find({})
        .then(insta => {
          const userProfileObj = {
            tweets: []
          };
          for (let i = 0; i < twitter.length; i++) {
            userProfileObj["tweets"].push({
              username: twitter[i]["username"],
              screen_name: twitter[i]["screen_name"],
              description: twitter[i]["description"],
              user_location: twitter[i]["user_location"],
              retweet_count: twitter[i]["retweet_count"],
              text: twitter[i]["text"]
            });
          }
          //const userProfiling = shell.exec("python script.py")
          const tempUserProfiling = {
            tweets: [
              {
                gender: "male",
                age_group: "Young",
                hate_speech: "0"
              },
              {
                gender: "female",
                age_group: "Middle_aged",
                hate_speech: "1"
              },
              {
                gender: "female",
                age_group: "Elder",
                hate_speech: "1"
              }
            ]
          };
          res.json({
            status: "success",
            twitter: twitter,
            instagram: insta,
            userProfiling: tempUserProfiling
          });
        });
    });
};
