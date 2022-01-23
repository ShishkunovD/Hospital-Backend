const Reseption = require('../../db/models/reseption/Reseption');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/default');

module.exports.getAllReseption = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secret);

  Reseption.find({ owner: decoded.userId }).then(result => {
    res.send({ data: result });
  });
}

module.exports.createNewReseption = (req, res) => {
  if (req.body.name !== undefined && req.body.doctor !== undefined && req.body.date !== undefined && req.body.complaints !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const reseption = new Reseption({...req.body, owner: decoded.userId});
    reseption.save().then(result => {
      res.send({ data: result });
    });
  } else {
    res.status(404).send("Error, all fields should be filled in correctly.");
  }
}

module.exports.updateReseption = (req, res) => {
  if (req.query.id !== undefined && 
    (req.body.name !== undefined && req.body.doctor !== undefined && req.body.date !== undefined && req.body.complaints !== undefined)) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const param = req.query.id;
    const body = req.body;
    Reseption.findByIdAndUpdate(param, body).then(result => {
      Reseption.find({ owner: decoded.userId }).then(result => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send("Error, all fields should be filled in correctly");
  }
}

module.exports.deleteReseption = (req, res) => {
  // console.log(req.query.id);
  // console.log(req.headers.authorization);
  // if(req.query.id !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const param = req.query.id;
    Reseption.deleteOne({ _id: param }).then(result => {
      Reseption.find({ owner: decoded.userId }).then(result => {
        res.send({ data: result });
      });
    });
  // } else {
  //   res.status(404).send("Error, please enter the correctly id");
  // }
}