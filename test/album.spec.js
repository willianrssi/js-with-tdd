/* eslint-disable */
import chai,{ expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

sinonStubPromisse(sinon);
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {

  let stubedFetch;
  let promise;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('Should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('Should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    })

    it('Should have getAlbumTracks method', () => {
      expect(spotify.album.getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum('incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with correct URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('Should return the correct data from promise', () => {
      promise.resolves({album: 'name'});
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({album: 'name'});
    });


  });

    describe('getAlbums', () => {

      it('should call fetch method', () => {
        const albums= spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('Should call fetch with correct URL', () => {
        const albums= spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk')

        const albums2 = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTL', '4aawyAB9vmqN3uQ7FjRGT7']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTL,4aawyAB9vmqN3uQ7FjRGT7')
      });

      it('should return the correct data from promise', () => {
        promise.resolves({albums: 'names'});
        const albums= spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(albums.resolveValue).to.be.eql({albums: 'names'});
      });
    });

    describe('getAlbumTracks', () => {

      it('Should calls fetch method', () => {
        const albumTracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('Should call fetch with correct URL', () => {
        const albumTracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

        const albumTracks2 = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTL');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTL/tracks')
      });

      it('Should return the correct data from promise', () => {
        promise.resolves({tracks: 'names'});
        const albumTracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(albumTracks.resolveValue).to.be.eql({tracks: 'names'})
      });

    })

});
