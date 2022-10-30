import { Component } from 'react'
import { Row, Col, Spin, Alert, Empty } from 'antd'

import MoviesCard from '../MoviesCard'

import styles from './MoviesCardList.module.css'

class MoviesCardList extends Component {
  renderMovies = () => {
    return this.props.movies.map((movie) => {
      if (!this.props.load) {
        return (
          <Col className="gutter-row" xs={24} lg={12} key={movie.id}>
            <MoviesCard movie={movie} />
          </Col>
        )
      }
    })
  }

  renderMoviesStatus = () => {
    if (this.props.load) {
      return <Spin size="large" spinning={this.props.load} />
    } else if (this.props.error) {
      return <Alert type="error" message={this.props.error} />
    } else if (!this.props.movies.length) {
      return <Empty description="No Movies Found" />
    }

    return false
  }

  render() {
    return (
      <div className={styles.moviesCardList}>
        <Row
          gutter={[
            { xs: 0, lg: 36 },
            { xs: 20, sm: 20, lg: 34 },
          ]}
        >
          {this.renderMovies()}
          <Col span={24} className={styles.moviesCardList__tips}>
            {this.renderMoviesStatus()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default MoviesCardList
