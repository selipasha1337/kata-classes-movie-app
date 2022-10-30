import axios from 'axios'

export default class MoviesService {
  static API_URL = 'https://api.themoviedb.org/3'
  static API_KEY = '133a5d5e76a1fa8b5d872d6e18fe32d5'

  static async getMovies(query, currentPage = 1) {
    const res = await axios.get(`${this.API_URL}/search/movie`, {
      params: {
        api_key: this.API_KEY,
        query: query,
        page: currentPage,
      },
    })
    return res.data
  }

  static async getTags() {
    const res = await axios.get(`${this.API_URL}/genre/movie/list`, {
      params: {
        api_key: this.API_KEY,
      },
    })

    return res.data.genres
  }

  static async setGuestSessionId() {
    const res = await axios.get(`${this.API_URL}/authentication/guest_session/new`, {
      params: {
        api_key: this.API_KEY,
      },
    })

    if (!localStorage.getItem('GUEST_SESSION_ID')) {
      return window.localStorage.setItem('GUEST_SESSION_ID', res.data.guest_session_id)
    }
  }

  static async getGuestSessionId() {
    await MoviesService.setGuestSessionId()
    return window.localStorage.getItem('GUEST_SESSION_ID')
  }
}
