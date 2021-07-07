const express = require('../express');
let router = express.Router();// function(req,res,next){}

//
router.get('/',function (req,res) {
    res.end('/user')
})
router.get('/add',function (req,res) {
    res.end('/user/add')
})

router.get('/remove',function (req,res) {
    res.end('/user/remove')
})

let UserChildRouter = express.Router();
UserChildRouter.get('/add',function (req,res) {
    res.end('child add')
})
UserChildRouter.get('/remove',function (req,res) {
    res.end('child remove')
})
router.use('/child',UserChildRouter)
module.exports = router;
