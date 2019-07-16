var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');
const Yup = require('yup');
 
const getUsersSchema = Yup.object().shape({
  name: Yup.string().min(2).max(20),
  email: Yup.string().min(2).max(20),
  role: Yup.number().positive().integer(),
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        await getUsersSchema.validate(req.query);
        const users = await userService.getUsers(req.query);
        res.json({ success: true, result: { users } });
    } catch(e) {
        res.json({ success: false });
    }
});

module.exports = router;
