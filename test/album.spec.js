/* eslint-disable */
import chai,{ expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'

sinonStubPromisse(sinon);
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {

  let stubedFetch;
  let promise;


  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('Should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('Should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    })

    it('Should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum('incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('Should return the correct data from promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({album: 'name'});
    });


  });

    describe('getAlbums', () => {

      it('should call fetch method', () => {
        const albums= getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('Should call fetch with correct URL', () => {
        const albums= getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk')

        const albums2 = getAlbums(['4aawyAB9vmqN3uQ7FjRGTL', '4aawyAB9vmqN3uQ7FjRGT7']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTL,4aawyAB9vmqN3uQ7FjRGT7')
      });

      it('should return the correct data from promise', () => {
        promise.resolves({album: 'names'});
        const albums= getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
        expect(albums.resolveValue).to.be.eql({albums: 'names'});
      });
    });

    describe('getAlbumTracks', () => {

      it('Should calls fetch method', () => {
        const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledOnce;
      });

      it('Should call fetch with correct URL', () => {
        const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

        const albumTracks2 = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTL');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTL/tracks')
      });

      it('Should return the correct data from promise', () => {
        promise.resolves({tracks: 'names'});
        const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(albumTracks.resolveValue).to.be.eql({tracks: 'names'})
      });

    })

});
