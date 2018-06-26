/* eslint-disable */
import chai,{ expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromisse from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

sinonStubPromisse(sinon);
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('SpotifyWrapper Library ', () => {

  it('Should create a instance from Spotify Wrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('Should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blablabla'
    });

    expect(spotify.apiURL).to.be.equal('blablabla');
  });

  it('should use default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('Should receive a tokes as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    });

    expect(spotify.token).to.be.equal('foo');
  });
});

describe('request method', () => {

  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  it('Should have request exists', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.request).to.exist;
  });

  it('Should call fetch when request', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    });
    spotify.request('url');

    expect(stubedFetch).to.have.been.calledOnce;
  });

  it('Should call fetch with correct url', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    });
    spotify.request('url');

    expect(stubedFetch).to.have.been.calledWith('url');
  });

  it('Should call fetch with right headers passed', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    });

    const headers = {
      headers: {
        Authorization: 'Bearer foo'
      }
    };

    spotify.request('url');

    expect(stubedFetch).to.have.been.calledWith('url', headers);
  });
});
