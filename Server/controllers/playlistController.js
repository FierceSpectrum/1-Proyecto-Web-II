const Playlist = require("../models/playlistModel");

/**
 * Creates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistPost = async (req, res) => {
    let playlist = new Playlist(req.body);
    await playlist.save()
        .then(data => {
            res.status(201); // CREATED
            res.header({
                'location': `/api/playlists/?id=${data.id}`
            });
            res.json(data);
        })
        .catch(err => {
            res.status(422);
            console.log('error while saving the playlist', err);
            res.json({
                error: 'There was an error saving the playlist'
            });
        });
};

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */
const playlistGet = (req, res) => {
    // if an specific playlist is required
    if (req.query && req.query.id) {
        Playlist.findById(req.query.id)
            .then((playlist) => {
                res.json(playlist);
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the playlist', err)
                res.json({ error: "Playlist doesnt exist" })
            });
    } else {
        // get all playlists
        Playlist.find()
            .then(playlists => {
                res.json(playlists);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};

/**
 * Updates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistPatch = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id) {
        Playlist.findById(req.query.id, function (err, playlist) {
            if (err) {
                res.status(404);
                console.log('error while queryting the playlist', err)
                res.json({ error: "Playlist doesnt exist" })
            }

            // update the playlist object (patch)
            playlist.title = req.body.title ? req.body.title : playlist.title;
            playlist.detail = req.body.detail ? req.body.detail : playlist.detail;
            // update the playlist object (put)
            // playlist.title = req.body.title
            // playlist.detail = req.body.detail

            playlist.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the playlist', err)
                    res.json({
                        error: 'There was an error saving the playlist'
                    });
                }
                res.status(200); // OK
                res.json(playlist);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Playlist doesnt exist" })
    }
};

/**
 * Deletes a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistDelete = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id) {
        Playlist.findById(req.query.id, function (err, playlist) {
            if (err) {
                res.status(404);
                console.log('error while queryting the playlist', err)
                res.json({ error: "Playlist doesnt exist" })
            }

            playlist.deleteOne(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while deleting the playlist', err)
                    res.json({
                        error: 'There was an error deleting the playlist'
                    });
                }
                res.status(204); //No content
                res.json({});
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Playlist doesnt exist" })
    }
};

module.exports = {
    playlistGet,
    playlistPost,
    playlistPatch,
    playlistDelete
}