import { Component } from 'react'

import MoviesCardList from '../MoviesCardList'
import MoviesService from '../../API/MoviesService'
import MoviesContext from '../../context/MoviesContext'
import MoviesPagination from '../MoviesPagination'

class RatedMoviesPage extends Component {
  static contextType = MoviesContext

  state = {
    movies: [],
    load: false,
    error: '',
    totalPages: 0,
    pageNumber: 1,
  }

  renderRatedPages = async () => {
    const { pageNumber } = this.state
    try {
      this.setState({ load: true })
      const res = await MoviesService.getRatedMovies(this.context.guestSessionId, pageNumber)
      this.setState({ movies: res.results })
      this.setState({ totalPages: res.total_pages })
    } catch (e) {
      this.setState({ error: e.message })
    } finally {
      this.setState({ load: false })
    }
  }

  componentDidMount() {
    this.renderRatedPages()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNumber !== this.state.pageNumber) {
      this.renderRatedPages()
    }
  }

  handlePagination = (page) => {
    this.setState({ pageNumber: page })
  }

  render() {
    const { movies, error, load, pageNumber, totalPages } = this.state

    return (
      <>
        <MoviesCardList movies={movies} error={error} load={load} />
        <MoviesPagination pageNumber={pageNumber} totalPages={totalPages} handlePagination={this.handlePagination} />
      </>
    )
  }
}

export default RatedMoviesPage
