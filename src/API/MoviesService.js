import axios from 'axios'

export default class MoviesService {
  static API_URL = 'https://api.themoviedb.org/3'
  static API_KEY = '133a5d5e76a1fa8b5d872d6e18fe32d5'

  static async getAllMovies(currentPage = 1) {
    const res = await axios.get(`${this.API_URL}/discover/movie`, {
      params: {
        api_key: this.API_KEY,
        page: currentPage,
      },
    })
    return res.data
  }

  static async getSearchedMovies(query) {
    const res = await axios.get(`${this.API_URL}/search/movie`, {
      params: {
        api_key: this.API_KEY,
        query: query,
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
}
