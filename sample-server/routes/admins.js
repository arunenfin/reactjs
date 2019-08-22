var express = require('express');
var router = express.Router();
var adminService = require('../services/admin.service');
const Yup = require('yup');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const lang = require('../lib/en.json');

const fsunlink = util.promisify(fs.unlink);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!req.body.id) { return cb(lang.USERIDREQ) }
        cb(null, `./public/uploads/users`)
    },
    filename: function (req, file, cb) {
        if(!req.body.id) { return cb(lang.USERIDREQ) }
        const ext = path.extname(file.originalname);
        cb(null, `${req.body.id}_${Date.now()}${ext}`)
    }
})

const upload = multer({ storage: storage })

const getUsersSchema = Yup.object().shape({
  id: Yup.string().min(24).max(30),
  search: Yup.string().min(2).max(20),
  role: Yup.number().positive().integer(),
});
 
const updateUserSchema = Yup.object().shape({
  id: Yup.string().min(24).max(30).required(),
  name: Yup.string().min(2).max(20),
  role: Yup.number().positive().integer(),
  status: Yup.number().positive().integer(),
});

const deleteAvatar = async (query) => {
    try {
        const user = await adminService.getAdmin(query, { avatar: 1 });
        if(!user) { throw new Error(); }
        if(user.avatar) {
            await fsunlink(`./public/uploads/admin/${user.avatar}`);
        }
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        await getUsersSchema.validate(req.query);
        const users = await adminService.getAdminsPaginate(req.query);
        res.json({ success: true, result: { data: users } });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});

router.put('/', async function(req, res, next) {
    try {
        await updateUserSchema.validate(req.body);
        let { id, email, ...rest } = req.body;
        const data = { $set: rest };
        await adminService.updateAdmin({ _id: id }, data);
        res.json({ success: true, result: {} });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});

router.post('/upload-avatar', upload.single('photo'), async function(req, res, next) {
    try {
        await updateUserSchema.validate(req.body);
        if(req.file) {
            const { id } = req.body;
            const data = { $set: { avatar: req.file.filename } };
            await deleteAvatar({ _id: id });
            await adminService.updateAdmin({ _id: id }, data);
            return res.json({ success: true, result: {} });
        }
        throw new Error();
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});

module.exports = router;
