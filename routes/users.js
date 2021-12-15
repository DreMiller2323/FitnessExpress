var express = require('express');
var router = express.Router();

var models = require('../models');
var local = require("../strategies/local")
router.use((req, res, next) => {
  console.log("Request made to users/route")
  next();
});
router.get("/", function (req, res, next) {
  if (req.user && req.user.Admin) {
    models.users
      .findAll({ where: { Deleted: 0 } })
      .then(users => res.render("users", { users: users }));
  } else {
    res.redirect("/users/unauthorized");
  }
});
router.get('/login', async (req, res,) => {
  res
    .header('Access-Control-Expose-Headers', 'auth-token')
    .header('auth-token', token)
    .json({ message: 'Logged In' })
  try {
    const results = await db.promise().query(`SELECT*FROM USERS`);
    console.log(results);
    res.send(200).send(results[0]);
  } catch (error) {
    console.log(error)
  }
});
router.get("/one/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .find({ where: { UserId: userId } })
    .then(user => res.render("specificUser", { user: user }));
});

router.get('/signup', (req, res) => {
  res.send('signup')
})

router.post('/signup', function (req, res, next) {

  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect('login');
      } else {
        res.send('This user already exists');
      }
    });
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', local.authenticate('local', {
  failureRedirect: '/users/login'
}),
  function (req, res, next) {
    res.redirect('exerices');
  });

router.get('/exercises', (req, res) => {
  res.send("Exercise")
})
router.post('/exercises', async function (req, res) {
  res.json(req.body)
   const { exercisename, sets, reps } = req.body;
  if ({ exercisename: +"", sets: +"", reps: +"" }) {

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
