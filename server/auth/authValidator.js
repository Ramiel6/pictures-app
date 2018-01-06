module.exports = {

    emailValidator : function (email) {
        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    },
    
    nameValidator: function (name) {
        return !/^[^\s](\s?[\w\d])*$/gi.test(name);
    }
};

