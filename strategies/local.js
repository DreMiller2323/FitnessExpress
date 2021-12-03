

var LocalStrategy = require('passport-local');
var passport = require('passport')
var db = require('../database');

passport.serializeUser((user,done)=>{
done(null, user.username);

});

passport.deserializeUser(async(id, done)=>{
   try{
    const result = await db.promise().query(`SELECT * FROM  USERS WHERE USERNAME='${username}'`)
if (result[0],[0]){
    console.log(result)
}
   }catch(err){
       console.log(err,null)
   }
});

passport.use('local', new LocalStrategy(
    async (username, password, done) => {

        try {
            const result = await db.promise().query(`SELECT * FROM  USERS WHERE USERNAME='${username}'`);
            if (result[0].length === 0) {
                console.log(result);
                done(null, false);
            } else {
                if (result[0].password === password) {
                    done(null, result[0][0]);
                } else {
                    done(null, false);
                }
            }
        } catch (err) {
            done(err, false);
        }
    }
));
