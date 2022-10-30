import { Component } from 'react'

import styles from './MoviesScore.module.css'

class MoviesScore extends Component {
  movieScoreClassFormat = (score) => {
    return `
        ${styles.moviesScore}
        ${score <= 3 ? `${styles.moviesScore_low}` : ''}
        ${score > 3 && score <= 5 ? `${styles.moviesScore_belowAverage}` : ''}
        ${score > 5 && score <= 7 ? `${styles.moviesScore_average}` : ''}
        ${score > 7 ? `${styles.moviesScore_high}` : ''}
      `
  }

  render() {
    const { value } = this.props

    return (
      <div className={this.movieScoreClassFormat(value)}>
        <span>{value}</span>
      </div>
    )
  }
}

export default MoviesScore
