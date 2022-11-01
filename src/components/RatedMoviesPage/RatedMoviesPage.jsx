import { Component } from 'react'

import MoviesCardList from '../MoviesCardList'

class RatedMoviesPage extends Component {
  state = {
    movies: [],
    load: false,
    error: '',
  }

  render() {
    const { movies, error, load } = this.state

    return <MoviesCardList movies={movies} error={error} load={load} />
  }
}

export default RatedMoviesPage
