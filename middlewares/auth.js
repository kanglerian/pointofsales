const Auth = {
    checkLogin: (req, res, next) => {
        if(!req.session.loggedIn){
            return res.redirect('/');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if(!req.session.role == 0){
            return res.redirect('/cashier');
        }
        next();
    }
}

export default Auth;