/* to run: babel-node albums.js */

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({ token: 'BQBDHJDzbqVmGyHCS4itDXJABo_e7IaZkAGi7gM2Ai1BTMfh-dChPJqXphRPfaNy2gBfONxY-CbebSc4HB4aIAlwtaKHkdFBBxPoKy_hrYFK7NBDFYYnzLVKmWDkd85mAb8DuY-VuGroDzPJDpEqoHgeBj5d3o0' });

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
