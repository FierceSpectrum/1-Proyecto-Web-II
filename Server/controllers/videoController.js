const Playlist = require("../models/playlistModel");
const Video = require("../models/videoModel");


/**
 * Creates a playlist
 *
 * @param {*} req
 * @param {*} res
 */

function verificarURLdeVideo(url) {
    const regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
}

const videoPost = async (req, res) => {
    const video = new Video();

    video.name = req.body.name;
    video.url = req.body.url;

    try {
        // Encuentra la playlist del usuario por su ID
        const playlist = await Playlist.findOne({ user: req.body.user })

        if (!playlist) {
            res.status(404);
            res.json({ error: 'User playlist not found' });
            return;
        }
        const verificarurl = verificarURLdeVideo(req.body.url);
        // Agrega un nuevo video a la playlist del usuario

        if (!verificarurl) {
            res.status(404);
            res.json({ error: 'Invalid url' });
            return;
        }
        playlist.playlist.push(video);

        // Guarda los cambios en el usuario
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

    } catch (error) {
        console.error('Error while saving the playlist:', error);
        res.status(500).json({ error: 'There was an error saving the playlist' });
    }
};

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */

const videoGet = (req, res) => {
    // if an specific playlist is required
    if (req.query && req.query.id && req.query.idvideo) {
        Playlist.findById(req.query.id)
            .then((playlist) => {
                if (playlist.state) {
                    const video = playlist.playlist.find(playlist => playlist._id == req.query.idvideo);
                    res.json(video);
                }
                else {
                    res.status(404);
                    console.log('error while queryting the playlist', err)
                    res.json({ error: "Playlist doesnt exist" })
                }
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the playlist', err)
                res.json({ error: "Playlist doesnt exist" })
            });
    } else {
        if (req.query && req.query.id) {
            Playlist.findById(req.query.id)
                .then((playlist) => {
                    if (playlist.state) {
                        res.json(playlist.playlist);
                    } else {
                        res.status(404);
                        console.log('error while queryting the playlist', err)
                        res.json({ error: "Playlist doesnt exist" })
                    }
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
                    const playlistsfilter = playlists.filter(playlist => playlist.state)
                    const playlistArray = playlistsfilter.map(playlist => playlist.playlist);
                    res.json(playlistArray);
                })
                .catch(err => {
                    res.status(422);
                    res.json({ "error": err });
                });
        };
    };
};

/**
 * Updates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const videoPatch = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id && req.query.idvideo) {
        Playlist.findById(req.query.id)
            .then(playlist => {
                if (!playlist.state) {
                    res.status(404);
                    console.log('error while queryting the playlist', err)
                    res.json({ error: "Playlist doesnt exist" })
                }
                
                const video = playlist.playlist.find(playlist => playlist._id == req.query.idvideo);
                
                video.name = req.body.name ? req.body.name : playlist.name;
                video.url = req.body.url ? req.body.url : playlist.url;

                playlist.save()
                    .then((playlist) => {
                        res.status(200); // OK
                        res.json(playlist);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while saving the video', err)
                        res.json({
                            error: 'There was an error saving the video'
                        });
                    });
                res.json(playlists.playlist);
            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the video', err)
                res.json({ error: "Video doesnt exist" })
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
const videoDelete = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id) {
        Playlist.playlist.findById(req.query.id)
            .then(playlists => {
                playlists.deleteOne(function (err) {
                    if (err) {
                        res.status(422);
                        console.log('error while deleting the video', err)
                        res.json({
                            error: 'There was an error deleting the video'
                        });
                    }
                    res.status(204); //No content
                    res.json({});
                });

            })
            .catch(err => {
                res.status(404);
                console.log('error while queryting the playlist', err)
                res.json({ error: "Video doesnt exist" })
            });
    } else {
        res.status(404);
        res.json({ error: "Video doesnt exist" })
    }
};

module.exports = {
    videoGet,
    videoPost,
    videoPatch,
    videoDelete,
}