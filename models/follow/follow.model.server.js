var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model('FollowModel', followSchema
);

function userFollowsUser(follow) {
    return followModel.create(follow);
}
function userUnfollowsUser(follow) {
    return followModel.deleteOne(follow);
}

function deleteAllWithQuery(query) {
    return followModel.deleteMany(query);
}


function findFollowingForUser(userId) {
    return followModel
        .find({follower: userId})
        .populate('following')
        .exec();
}


module.exports = {
    userFollowsUser:userFollowsUser,
    userUnfollowsUser: userUnfollowsUser,
    findFollowingForUser:findFollowingForUser,
    deleteAllWithQuery: deleteAllWithQuery
};