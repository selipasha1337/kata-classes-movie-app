import { Component, createContext } from 'react'

import MoviesService from '../API/MoviesService'

const MoviesContext = createContext(null)

export class MoviesProvider extends Component {
  state = {
    movieTags: [],
    guestSessionId: '',
  }

  async componentDidMount() {
    const movieTags = await MoviesService.getTags()
    this.setState({ movieTags })

    const guestSessionId = await MoviesService.getGuestSessionId()
    this.setState({ guestSessionId })
  }

  render() {
    const { movieTags, guestSessionId } = this.state
    const { children } = this.props

    return (
      <MoviesContext.Provider
        value={{
          movieTags,
          guestSessionId,
        }}
      >
        {children}
      </MoviesContext.Provider>
    )
  }
}

export default MoviesContext
