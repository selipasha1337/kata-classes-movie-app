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

    window.localStorage.setItem('SESSION_ID', this.state.guestSessionId)
    const guestSessionId = await MoviesService.getGuestSessionId()
    this.setState({ guestSessionId })
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
