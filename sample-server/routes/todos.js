var express = require('express');
var router = express.Router();
var todoService = require('../services/todo.service');
const Yup = require('yup');

const getTodosSchema = Yup.object().shape({
  id: Yup.string().min(24).max(30),
  search: Yup.string().min(2).max(20),
  status: Yup.number().positive().integer(),
  date: Yup.string().length(10),
});
 
const updateTodoSchema = Yup.object().shape({
  id: Yup.string().min(24).max(30).required(),
  title: Yup.string(),
  description: Yup.string(),
  status: Yup.number().positive().integer().max(2),
  date: Yup.string().length(10),
});
 
const createTodoSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  status: Yup.number().positive().integer().max(2),
  date: Yup.string().length(10).required(),
});

/* GET todos listing. */
router.get('/', async function(req, res, next) {
    try {
        const user = req.user;
        await getTodosSchema.validate(req.query);
        req.query.user = user._id;
        const todos = await todoService.getTodosPaginate(req.query);
        res.json({ success: true, result: { data: todos } });
    } catch(e) {
        console.log(e)
        res.json({ success: false });
    }
});

router.put('/', async function(req, res, next) {
    try {
        const user = req.user;
        await updateTodoSchema.validate(req.body);
        let { id, ...rest } = req.body;
        const data = { $set: rest };
        await todoService.updateTodo({ _id: id, user: user._id }, data);
        res.json({ success: true, result: {} });
    } catch(e) {
        console.log(e)
        res.json({ success: false });
    }
});

router.post('/', async function(req, res, next) {
    try {
        const user = req.user;
        await createTodoSchema.validate(req.body);
        req.body.user = user._id;
        await todoService.createTodo(req.body);
        res.json({ success: true, result: {} });
    } catch(e) {
        console.log(e)
        res.json({ success: false });
    }
});


module.exports = router;
