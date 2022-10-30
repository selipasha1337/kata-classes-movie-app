import { Component, createContext } from 'react'

import MoviesService from '../API/MoviesService'

const MoviesContext = createContext(null)

export class MoviesProvider extends Component {
  state = {
    movieTags: [],
  }

  async componentDidMount() {
    const movieTags = await MoviesService.getTags()
    this.setState({ movieTags })
  }

  render() {
    const { movieTags } = this.state
    const { children } = this.props

    return (
      <MoviesContext.Provider
        value={{
          movieTags,
        }}
      >
        {children}
      </MoviesContext.Provider>
    )
  }
}

export default MoviesContext
