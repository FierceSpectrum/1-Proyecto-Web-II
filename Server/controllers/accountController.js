const Account = require("../models/accountModel");
const User = require("../models/userModel");



/**
 * Creates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPost = async (req, res) => {
    const account = new Account();

    account.full_name = req.body.full_name;
    account.pin = req.body.pin;
    account.avatar = req.body.avatar;
    account.age = req.body.age;

    try {
        // Encuentra la usuario por su ID
        const user = await User.findById(req.body.user);

        if (!user) {
            res.status(404);
            res.json({ error: 'User not found' });
            return;
        }

        const validpin = req.body.pin.toString().length == 6;

        if (validpin) {

            user.account.push(account);

            await account.save()
                .then(data => {
                    res.status(201); // CREATED
                    res.header({
                        'location': `/api/accounts/?id=${data.id}`
                    });
                    res.json(data);
                })
                .catch(err => {
                    res.status(422);
                    console.log('error while saving the account', err);
                    res.json({
                        error: 'There was an error saving the account'
                    });
                });
        }
        else {
            res.status(422);
            console.log('error while saving the account')
            res.json({
                error: 'No valid data provided for account'
            });
        };

    } catch (error) {
        console.error('Error while saving the account:', error);
        res.status(500).json({ error: 'There was an error saving the account' });
    }
};

/**
 * Get all accounts
 *
 * @param {*} req
 * @param {*} res
 */
const accountGet = (req, res) => {
    // if an specific account is required
    if (req.query && req.query.id) {
        User.account.findById(req.query.id)
            .then((account) => {
                res.json(account);
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the account', err)
                res.json({ error: "Account doesnt exist" })
            });
    } else {
        // get all accounts
        User.account.find()
            .then(accounts => {
                res.json(accounts);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};

/**
 * Updates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPatch = (req, res) => {
    // get account by id
    if (req.query && req.query.id) {
        User.account.findById(req.query.id)
            .then(account => {

                const validpin = req.body.pin.toString().length == 6;
                if (!validpin) {
                    res.status(422);
                    console.log('error saving pin', err)
                    res.json({
                        error: 'There was an error saving the pin'
                    });
                }
                // update the playlist object (patch)

                account.full_name = req.body.full_name ? req.body.full_name : account.full_name;
                account.avatar = req.body.avatar ? req.body.avatar : account.avatar;
                account.age = req.body.age ? req.body.age : account.age;
                account.pin = req.body.pin ? req.body.pin : account.pin;

                // update the playlist object (put)
                // playlist.title = req.body.title
                // playlist.detail = req.body.detail

                account.save()
                    .then(data => {
                        res.status(200); // OK
                        res.header({
                            'location': `/api/accounts/?id=${data.id}`
                        });
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while saving the account', err)
                        res.json({ error: 'There was an error saving the account' });
                    });
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the account', err)
                res.json({ error: "Account doesnt exist" })
            });
    } else {
        res.status(404);
        res.json({ error: "Account doesnt exist" })
    }
};

/**
 * Deletes a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountDelete = (req, res) => {
    // get account by id
    if (req.query && req.query.id) {
        User.account.findById(req.query.id)
            .then(account => {

                ccount.state = false
                
                account.save()
                    .then(data => {
                        res.status(200); // OK
                        res.header({
                            'location': `/api/accounts/?id=${data.id}`
                        });
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while deleting the account', err)
                        res.json({
                            error: 'There was an error deleting the account'
                        });
                    });
                    

            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the account', err)
                res.json({ error: "Account doesnt exist" })
            });
    } else {
        res.status(404);
        res.json({ error: "Account doesnt exist" })
    }
};

module.exports = {
    accountGet,
    accountPost,
    accountPatch,
    accountDelete
}