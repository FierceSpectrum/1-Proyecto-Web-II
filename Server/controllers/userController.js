const User = require("../models/userModel");

/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = async (req, res) => {
    let user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.pin = req.body.pin;
    user.name = req.body.name;
    user.last_name = req.body.last_name;
    user.country = req.body.country;
    user.birthdate = req.body.birthdate;
    user.accounts = 6;
    user.playlists = 1;
    user.state = true;

    const today = new Date();
    const age = today.getFullYear() - user.birthdate.getFullYear();

    const operador = (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()))
    age -= operador ? 1 : 0

    if (age >= 18 && user.email) {
        await user.save()
            .then(data => {
                res.status(201); // CREATED
                res.header({
                    'location': `/api/users/?id=${data.id}`
                });
                res.json(data);
            })
            .catch(err => {
                res.status(422);
                console.log('error while saving the user', err);
                res.json({
                    error: 'There was an error saving the user'
                });
            });
    } else {
        res.status(422);
        console.log('error while saving the user')
        res.json({
            error: 'No valid data provided for user'
        });
    }
};

/**
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
    // if an specific user is required
    if (req.query && req.query.id) {
        User.findById(req.query.id)
            .then((user) => {
                res.json(user);
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
            });
    } else {
        // get all users
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};

/**
 * Get email users
 *
 * @param {*} req
 * @param {*} res
 */
const user_emailGet = (req, res) => {
    // if an specific user is required
    if (req.query && req.query.id) {
        User.findById(req.query.id)
            .then((user) => {
                res.json(user);
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
            });
    } else {
        // get all users
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPatch = (req, res) => {
    // get user by id
    if (req.query && req.query.id) {
        User.findById(req.query.id, function (err, user) {
            if (err) {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
            }

            // update the user object (patch)
            user.title = req.body.title ? req.body.title : user.title;
            user.detail = req.body.detail ? req.body.detail : user.detail;
            // update the user object (put)
            // user.title = req.body.title
            // user.detail = req.body.detail

            user.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the user', err)
                    res.json({
                        error: 'There was an error saving the user'
                    });
                }
                res.status(200); // OK
                res.json(user);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "User doesnt exist" })
    }
};

/**
 * Deletes a user
 *
 * @param {*} req
 * @param {*} res
 */
const userDelete = (req, res) => {
    // get user by id
    if (req.query && req.query.id) {
        User.findById(req.query.id, function (err, user) {
            if (err) {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
            }

            user.deleteOne(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while deleting the user', err)
                    res.json({
                        error: 'There was an error deleting the user'
                    });
                }
                res.status(204); //No content
                res.json({});
            });
        });
    } else {
        res.status(404);
        res.json({ error: "user doesnt exist" })
    }
};

module.exports = {
    userGet,
    userPost,
    userPatch,
    userDelete
}