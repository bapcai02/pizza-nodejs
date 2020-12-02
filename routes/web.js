
const homeController = require('../app/http/controllers/HomeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/cartController');

function initRoutes(app){

    app.get('/', homeController().index);
    
    app.get('/register', authController().register);
    app.post('/register', authController().p_register);
    app.get('/login', authController().login);

    app.get('/cart', cartController().index);
    app.post('/cart-update', cartController().update);

}

module.exports = initRoutes;