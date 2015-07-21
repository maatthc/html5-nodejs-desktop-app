window.dash = window.dash || {};


dash.registerUser = function (name, userid, password) {

    /*
    *  response code : 0 - User with this id already exists
    *  response code : 1 - Sucessfully registered and User has already filled the settings
    *  response code : 2 - Sucessfully registered and User has not filled the settings
    */

    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return 0;         
    }
    var bcrypt = new bCrypt();
    user = {};
    user.name = name;
    bcrypt.hashpw(password,bcrypt.gensalt(5),function(pass_crypt){
        var user = JSON.parse(localStorage.getItem('user'));
        alert(user.name);
        user.password = pass_crypt;
        localStorage.setItem('user', JSON.stringify(user));
    }, function() {});
    user.userid = userid;
    localStorage.setItem('user', JSON.stringify(user));
    // Sleep
    var now = new Date().getTime();
    while(new Date().getTime() < now + 2000){ /* do nothing */ }
    return populateUser(user);
};

dash.authUser = function (userid, password) {
    
    /*
    *  response code : 0 - User does not exists
    *  response code : 1 - Sucessfully logged in and User has already filled the settings
    *  response code : 2 - Sucessfully logged in and User has not filled the settings
    *  response code : 3 - Authentication failed
    */

    // fetch the user from DB
    user = JSON.parse(localStorage.getItem('user'));
    var bcrypt = new bCrypt();
    if (user) {
        if (bcrypt.checkpw(password, user.password, function(){}, function(){})) {
            return populateUser(user);
        } else {
            return 3;
        }

    } else {
        return 0;
    }
};

dash.signOut = function () {

    /*
    *  Clean localstorage
    */

	localStorage.removeItem('logged');
	return 1;
};

var populateUser = function(user) {
    
    /*
    *  Create a "Session"
    */

    localStorage.setItem('logged', "1");
    return 1;
};

