import { Component } from 'react'
import './App.css'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import Container from './components/Container'
import MoviesTabs from './components/MoviesTabs'
import { MoviesProvider } from './context/MoviesContext'

// TODO: хранить id фильма и поставленную оценку в localStorage
// TODO: оценка фильма и добавление в массив
// TODO: фильтр, чтобы фильм нельзя было несколько раз оценить
// TODO: вывод массива с карточками в таб Rated
// TODO: возможность удалять оцененные фильмы

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
