const User = require("../models/userModel");


const validarEmail = (email) => {
    // Expresión regular para validar un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */


const userPost = async (req, res) => {
    const user = new User();

    const fechaCompleta = new Date(req.body.birthdate);
    const año = fechaCompleta.getFullYear();
    const mes = fechaCompleta.getMonth();
    const dia = fechaCompleta.getDate();
    const dateOnly = new Date(año, mes, dia);

    user.email = req.body.email;
    user.password = req.body.password;
    user.pin = req.body.pin;
    user.name = req.body.name;
    user.last_name = req.body.last_name;
    user.country = req.body.country;
    user.birthdate = dateOnly;
    user.accounts = 6;
    user.playlists = 1;
    user.state = true;


    // valida el pin
    const validpin = req.body.pin.toString().length == 6;

    // valida la edad
    const today = new Date();
    const birthdate = new Date(user.birthdate);

    const operador = (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()))
    const age = 18 <= (today.getFullYear() - birthdate.getFullYear() - (operador ? 1 : 0));

    // valida el email



    const validemail = validarEmail(user.email);
    const usedemail = !await User.findOne({ email: user.email });

    if (age && validemail && usedemail && validpin) {
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
                if (user.state) {
                    res.json(user);
                }
                else {
                    res.status(404);
                    console.log('error while queryting the user', err)
                    res.json({ error: "User doesnt exist" })
                }
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
                const usersfilter = users.filter(user => user.state)
                res.json(usersfilter);
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
        User.findById(req.query.id)
            .then((user) => {
                if (!user.state) {
                    res.status(404);
                    console.log('error while queryting the user', err)
                    res.json({ error: "User doesnt exist" })
                }

                const validpin = req.body.pin.toString().length == 6;
                if (!validpin) {
                    res.status(422);
                    console.log('error saving pin', err)
                    res.json({
                        error: 'There was an error saving the pin'
                    });
                }

                const operador = (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()))
                const age = 18 <= (today.getFullYear() - birthdate.getFullYear() - (operador ? 1 : 0));
                if (!age) {
                    res.status(422);
                    console.log('error saving pin', err)
                    res.json({
                        error: 'There was an error saving the pin'
                    });
                }

                user.password = req.body.password ? req.body.password : user.password;
                user.pin = req.body.pin ? req.body.pin : user.pin;
                user.name = req.body.name ? req.body.name : user.name;
                user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
                user.country = req.body.country ? req.body.country : user.country;
                user.birthdate = req.body.birthdate ? req.body.birthdate : user.birthdate;
                user.accounts = req.body.accounts ? req.body.accounts : user.accounts;
                user.playlists = req.body.playlists ? req.body.playlists : user.playlists;

                user.save()
                    .then((user) => {
                        res.status(200); // OK
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while saving the user', err)
                        res.json({
                            error: 'There was an error saving the user'
                        });
                    });
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
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
        User.findById(req.query.id)
            .then((user) => {
                if (!user.state) {
                    res.status(404);
                    console.log('error while queryting the user', err)
                    res.json({ error: "User doesnt exist" })
                }
                
                user.state = false;

                user.save()
                    .then(() => {
                        res.status(204); //No content
                        res.json({});
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while deleting the user', err)
                        res.json({
                            error: 'There was an error deleting the user'
                        });
                    });
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "User doesnt exist" })
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