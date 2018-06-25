module.exports = function (app) {
    app.post('/api/admin/adduser', addUser);
    app.put('/api/admin/updateuser', updateUser);

    var userModel = require('../models/user/user.model.server');

    function addUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                res.send(user);
            })
    }

    function updateUser(req,res) {
        var user = req.body;
        userModel
            .updateUser(user)
            .then(function () {
                res.json(user);
            })
    }

}