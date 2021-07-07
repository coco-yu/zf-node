const express = require('../express');
let router = express.Router();

router.get('/add',function (req,res) {
    res.end('/article/add')
})

router.get('/remove',function (req,res) {
    res.end('/article/remove')
})

module.exports = router;
