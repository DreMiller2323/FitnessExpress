var express = require('express');
var router = express.Router();
var db = require("../database")

router.use((req, res, next)=>{
  console.log("Request made to users/route")
next();
});

router.get('/login',  async (req, res,) => {
try{
    const results = await db.promise().query(`SELECT*FROM USERS`);
    console.log(results);
    res.send(200).send(results[0]);
}catch(error){
  console.log(error)
}
   });
router.get('/signup',  (req, res) => {
  res.send('signup')
})

router.post('/signup', function (req, res) {
  const { username, password } = req.body;
  if (username && password) {
    try {
      db.promise().query(`INSERT INTO USERS VALUES('${username}','${password}')`);
      res.status(201).send({ msg: 'user created' });
    }
    catch (err) {
      console.log(err);
    }
  }
});


router.get('/exercises', (req, res) => {
  res.send("Exercise")
})
router.post('/exercises', function (req, res) {
  const { exercisename, sets, reps } = req.body;
  if ({ exercisename: +"", sets: +"", reps: +"" })  {
 
    try {
      db.promise().query(`INSERT INTO EXERCISES VALUES('${exercisename}','${sets}' '${reps}' }`);
      res.status(201).send({ msg: 'exercise data stored' });
    }
    catch (err) {
      console.log(err);
    }

  }
});

module.exports = router;
