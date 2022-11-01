import { Component } from 'react'
import { debounce } from 'lodash'

import MoviesSearch from '../MoviesSearch'
import MoviesCardList from '../MoviesCardList'
import MoviesPagination from '../MoviesPagination'
import MoviesService from '../../API/MoviesService'

class SearchMoviesPage extends Component {
  state = {
    movies: [],
    load: false,
    error: '',
    search: '',
    pageNumber: 1,
    totalPages: 0,
  }

  async componentDidMount() {
    const { pageNumber } = this.state
    try {
      this.setState({ load: true })
      const res = await MoviesService.getMovies('return', pageNumber)
      this.setState({ movies: res.results })
      this.setState({ totalPages: res.total_pages })
    } catch (e) {
      this.setState({ error: e.message })
    } finally {
      this.setState({ load: false })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search, pageNumber } = this.state

    if (prevState.search !== search || prevState.pageNumber !== this.state.pageNumber) {
      try {
        this.setState({ load: true })
        let res = await MoviesService.getMovies('return', pageNumber)

        if (search) {
          res = await MoviesService.getMovies(search, pageNumber)
        }

        if (prevState.pageNumber === this.state.pageNumber) {
          this.setState({ pageNumber: 1 })
        }

        this.setState({ movies: res.results })
        this.setState({ totalPages: res.total_pages })
      } catch (e) {
        this.setState({ error: e.message })
      } finally {
        this.setState({ load: false })
      }
    }
  }

  handleSearchValue = debounce((e) => {
    this.setState({ search: e.target.value.trim() })
  }, 500)

  handlePagination = (page) => {
    this.setState({ pageNumber: page })
  }

  render() {
    const { movies, load, error, search, pageNumber, totalPages } = this.state

    return (
      <>
        <MoviesSearch value={search} onChange={this.handleSearchValue} />
        <MoviesCardList movies={movies} error={error} load={load} />
        <MoviesPagination pageNumber={pageNumber} totalPages={totalPages} handlePagination={this.handlePagination} />
      </>
    )
  }
}

export default SearchMoviesPage
