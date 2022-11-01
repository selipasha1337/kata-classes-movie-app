import { Component, createContext } from 'react'

import MoviesService from '../API/MoviesService'

const MoviesContext = createContext(null)

export class MoviesProvider extends Component {
  state = {
    movieTags: [],
    guestSessionId: '',
    rate: 0,
  }

  async componentDidMount() {
    const movieTags = await MoviesService.getTags()
    this.setState({ movieTags })

    const guestSessionId = await MoviesService.getGuestSessionId()
    this.setState({ guestSessionId })

    localStorage.setItem('rate', this.state.rate)
  }

  render() {
    const { movieTags, guestSessionId, rate } = this.state
    const { children } = this.props

    return (
      <MoviesContext.Provider
        value={{
          movieTags,
          guestSessionId,
          rate,
        }}
      >
        {children}
      </MoviesContext.Provider>
    )
  }
}

export default MoviesContext
