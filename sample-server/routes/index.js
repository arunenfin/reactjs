const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const Yup = require('yup');
 
const registerSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(20),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6).max(10),
  role: Yup.number().positive().integer(),
});

const authenticateSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6).max(10),
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ success: true, msg: "Express Application" });
});

router.post('/authenticate', async function(req, res, next) {
  try {
      await authenticateSchema.validate(req.body);
      const token = await userService.authenticate(req.body);
      res.json({ success: true, result: { token } });
  } catch(e) {
      console.log(e);
      res.json({ success: false });
  }
});

router.post('/register', async function(req, res, next) {
  try {
      await registerSchema.validate(req.body);
      await userService.createUser(req.body);
      res.json({ success: true, result: {} });
  } catch(e) {
      console.log(e);
      res.json({ success: false });
  }
});

module.exports = router;
