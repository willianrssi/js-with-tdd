import { searchArtists } from '../src/';

global.fetch = require('node-fetch');

const artists = searchArtists('Incubus');

console.log(artists)
