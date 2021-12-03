var express = require('express');
var passport = require("passport");
var router = express.Router();


router.get('/', (req, res)=>{
    res.send("auth route")
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200)
});

module.exports = router;