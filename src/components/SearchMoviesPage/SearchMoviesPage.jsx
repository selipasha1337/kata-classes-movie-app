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
  }

  async componentDidMount() {
    try {
      this.setState({ load: true })
      const allMovies = await MoviesService.getAllMovies()
      this.setState({ movies: [...allMovies.results] })
    } catch (e) {
      this.setState({ error: e.message })
    } finally {
      this.setState({ load: false })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.state
    if (prevState.search !== search) {
      try {
        this.setState({ load: true })
        if (search) {
          const searchedMovies = await MoviesService.getSearchedMovies(search)
          this.setState({ movies: searchedMovies.results })
        } else {
          const allMovies = await MoviesService.getAllMovies()
          this.setState({ movies: allMovies.results })
        }
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

  render() {
    const { movies, load, error, search } = this.state

    return (
      <>
        <MoviesSearch value={search} onChange={this.handleSearchValue} />
        <MoviesCardList movies={movies} error={error} load={load} />
        <MoviesPagination />
      </>
    )
  }
}

export default SearchMoviesPage
