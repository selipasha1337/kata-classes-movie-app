import { Component } from 'react'
import { Tabs } from 'antd'

import SearchMoviesPage from '../SearchMoviesPage'
import RatedMoviesPage from '../RatedMoviesPage'

import './MoviesTabs.css'

class MoviesTabs extends Component {
  render() {
    return (
      <div className="moviesTabs">
        <Tabs
          defaultActiveKey="search"
          centered
          destroyInactiveTabPane
          items={[
            {
              label: 'Search',
              key: 'search',
              children: <SearchMoviesPage />,
            },
            {
              label: 'Rated',
              key: 'rated',
              children: <RatedMoviesPage />,
            },
          ]}
        />
      </div>
    )
  }
}

export default MoviesTabs
