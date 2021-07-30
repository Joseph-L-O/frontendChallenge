import { clearToken, getToken } from 'utils'
import axios from 'axios'

class ClientRes {
  constructor(accessToken) {
    this.accessToken = accessToken
  }


  async getUserName() {
    const promise = axios.get('https://api.spotify.com/v1/me', {
      params: {
        access_token: getToken()
      }
    }).then((response) =>
      response
    ).then(response =>
      response.data.display_name
    ).catch((error) => {
      clearToken(error.response.status)
    })
    return promise
  }

  async getArtists(qsearch) {
    if (qsearch) {
      const promise = axios.get('https://api.spotify.com/v1/search', {
        params: {
          access_token: getToken(),
          q: qsearch,
          type: 'artist',
        }
      }).then((response) =>
        response
      ).then(response =>
        response.data.artists
      ).catch(error => {
        clearToken(error.response.status)
      })
      return promise

    }
  }


  async getArtistContent(idartist) {
    const promise = axios.get(`https://api.spotify.com/v1/artists/${idartist}`, {
      params: {
        access_token: getToken(),
      }
    }).then((response) =>
      response
    ).then(response =>
      response.data
    ).catch((error) => {
      clearToken(error.response.status)
    })
    return promise
  }

  async getArtistAlbums(artistid) {
    const promise = axios.get(`https://api.spotify.com/v1/artists/${artistid}/albums`, {
      params: {
        access_token: getToken(),
      }
    }).then((response) =>
      response
    ).then(response =>
      response.data
    ).catch((error) => {
      clearToken(error.response.status)
    })
    return promise
  }

  async getAlbumContent(albumid) {
    const promise = axios.get(`https://api.spotify.com/v1/albums/${albumid}`, {
      params: {
        access_token: getToken(),
      }
    }).then((response) =>
      response
    ).then(response =>
      response.data
    ).catch((error) => {
      clearToken(error.response.status)
    })
    return promise
  }
}

export default ClientRes
