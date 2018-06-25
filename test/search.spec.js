/* eslint-disable */
import { search, searchAlbums, searchArtists, searchTracks, searchPlayLists } from '../src/search';

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchLists method', () => {
      expect(searchPlayLists).to.exist;
    });

  });

  describe('Generic search', () => {

    it('should call fetch function', () => {

      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {

        const artits = search('Incubus', 'artist')

        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist");

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=album");

      });

      context('passing more than one type', () => {

        const artistAndAlbum = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist,album");

      });

    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json'});
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({body: 'json'});
    });

  });

  describe('Search Artists', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
    });

  });

  describe('Search Artists', () => {

    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
    });

  });

  describe('Search Tracks', () => {

    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
    });

  });

  describe('Search Playlists', () => {

    it('should call fetch function', () => {
      const playlist = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const playlist = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const playlists2 = searchPlayLists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
    });

  });

});
