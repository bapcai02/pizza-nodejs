

function authController(){
    return {
        login(req, res){
            res.render('auth/login');
        },
        register(req, res){
            res.render('auth/register');
        }
        ,
        p_register(req, res){
            const { name, email, password } = req.body
        }
    }
}

module.exports = authController;