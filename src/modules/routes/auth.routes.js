const Router = require("express");
const User = require('../../db/models/user/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/default');
const { check, validationResult } = require("express-validator");

const router = new Router();

router.post('/registrationsend', 
  [
    check('login', 'Uncorrect login').notEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({min:6})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Uncorrect request', errors });
    }

    const {login, password} = req.body;
    const candidate = await User.findOne({login});

    if (candidate) {
      return res.status(400).json({ message: `User with login ${login} already exist` });
    } else {
      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({ login, password: hashPassword });
      await user.save();
      return res.json({message: 'User was created'});
    }
  } catch(e) {
    console.log(e);
  }

})

router.post('/login', async (req, res) => {
  try{
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: "User not find" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "24h" });
    return res.json({
      token
    })
  }
  catch (e){
    console.log(e);
    res.send({ message: 'Server error' });
  }
})

module.exports = router;