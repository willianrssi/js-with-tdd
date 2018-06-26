/* to run: babel-node albums.js */

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({ token: 'BQDdN_zPYhrXxh74Ct7mWXE7YBw-L9B7SbgxJ5bTCBWtGdZRe8mQ9u3_FQM3yDhotIKZoyUJPv5My-J-rBYSWg137Dr84wIrhfgkRpDm_zKNX6SILCOuFTb5OBc5YBNzT9NQnrzQtYly31Nm92yVooq_GjOgEsQ' });

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
