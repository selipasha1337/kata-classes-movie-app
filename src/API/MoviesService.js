import axios from 'axios'
import { Component } from 'react'

class MoviesService extends Component {
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

  static async getGuestSessionId() {
    const res = await axios.get(`${this.API_URL}/authentication/guest_session/new`, {
      params: {
        api_key: this.API_KEY,
      },
    })

    if (!localStorage.getItem('GUEST_SESSION_ID')) {
      window.localStorage.setItem('GUEST_SESSION_ID', res.data.guest_session_id)
    }

    return window.localStorage.getItem('GUEST_SESSION_ID')
  }

  static async rateMovie(movieId, guestSessionId, rateValue) {
    const res = await axios.post(
      `${this.API_URL}/movie/${movieId}/rating`,
      {
        value: rateValue,
      },
      {
        params: {
          api_key: this.API_KEY,
          guest_session_id: guestSessionId,
        },
      }
    )

    return res.data
  }

  static async getRatedMovies(guestSessionId, currentPage) {
    const res = await axios.get(`${this.API_URL}/guest_session/${guestSessionId}/rated/movies`, {
      params: {
        api_key: this.API_KEY,
        page: currentPage,
      },
    })
    return res.data
  }
}

export default MoviesService
