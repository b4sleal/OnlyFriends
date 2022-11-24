const SpotifyWebApi = require("spotify-web-api-node");
const refresh = {}

const spotifyApi = new SpotifyWebApi({
    refreshToken: 'AQCRPD9PiER-s33DWnh_UpI-cMGFarDkLZeKm_og9JawTp4-NgchaExXrOoBKA45M9u4NzMHlu6K2JsRltjM6CyWqrl0ZNbhVWaYNW3SgBxSJZ-IknmbfhomHK8gtKotvXA',
    clientId: 'f76e2cc77a064692928a9e019f67af96',
    clientSecret: '2d82a3c9a3a84405b21dabd345a9b6fa',
    redirectUri: 'http://localhost:8000/spotify'
});

module.exports = (app) => {
    app.get('/api/auth/spotify', async (req, res) => {
        const {email} = req.query

        console.log('get')
        if (refresh[email] > Date.now()) {
            console.log('send current!')
            return res.send({ token: spotifyApi.getAccessToken() });
        }

        console.log('reset D:')
        spotifyApi.refreshAccessToken((err, _res) => {
            spotifyApi.setAccessToken(_res.body.access_token)
            refresh[email] = Date.now() + 3500 * 1000

            res.send({ token: _res.body.access_token });
        });
    });
};