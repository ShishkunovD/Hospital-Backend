const Reseption = require('../../db/models/reseption/index');

module.exports.createNewReseption = (req, res) => {
    if (req.body.name !== undefined) {
      const reseption = new Reseption(req.body);
      reseption.save().then(result => {
        console.log({ data: result });
      });
    } else {
      res.status(404).send("Error, all fields should be filled in correctly.");
    }
  }