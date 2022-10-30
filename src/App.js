import { Component } from 'react'
import './App.css'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import Container from './components/Container'
import MoviesTabs from './components/MoviesTabs'
import { MoviesProvider } from './context/MoviesContext'

// TODO: пагинация (проверить запросы на get и post)

class App extends Component {
  render() {
    return (
      <Container>
        <Offline>
          <div style={{ padding: '24px 0' }}>
            <Alert type="error" message="Error!" description="You're offline! Please check your internet connection" />
          </div>
        </Offline>
        <Online>
          <MoviesProvider>
            <MoviesTabs />
          </MoviesProvider>
        </Online>
      </Container>
    )
  }
}

export default App
