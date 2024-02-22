const Account = require("../models/accountModel");

/**
 * Creates a account
 *
 * @param {*} req
 * @param {*} res
 */
const accountPost = async (req, res) => {
    let account = new Account(req.body);
    /* let account = new Account();

    account.full_name = req.body.full_name;
    account.pin = req.body.pin;
    account.avatar = req.body.avatar;
    account.age = req.body.age;
    account.user = req.body.user; */

    if (account.name && account.code) {
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
    } else {
        res.status(422);
        console.log('error while saving the account')
        res.json({
            error: 'No valid data provided for account'
        });
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
        Account.findById(req.query.id)
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
        Account.find()
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
        Account.findById(req.query.id, function (err, account) {
            if (err) {
                res.status(404);
                console.log('error while queryting the account', err)
                res.json({ error: "Account doesnt exist" })
            }

            // update the account object (patch)
            account.title = req.body.title ? req.body.title : account.title;
            account.detail = req.body.detail ? req.body.detail : account.detail;
            // update the account object (put)
            // account.title = req.body.title
            // account.detail = req.body.detail

            account.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the account', err)
                    res.json({
                        error: 'There was an error saving the account'
                    });
                }
                res.status(200); // OK
                res.json(account);
            });
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
        Account.findById(req.query.id, function (err, account) {
            if (err) {
                res.status(404);
                console.log('error while queryting the account', err)
                res.json({ error: "Account doesnt exist" })
            }

            account.deleteOne(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while deleting the account', err)
                    res.json({
                        error: 'There was an error deleting the account'
                    });
                }
                res.status(204); //No content
                res.json({});
            });
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