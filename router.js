const passport = require('passport');
const passportService = require('./services/passport');
const auth = require('./controllers/auth');

passport.use(passportService.jwtLogin);
passport.use(passportService.localLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Ok' });
  });
  app.post('/auth/signin', requireSignin, auth.signin);
  app.post('/auth/signup', auth.signup);
};
