import { Component } from 'react'
import { Image, Rate, Tag, Typography } from 'antd'
import { format, parseISO } from 'date-fns'
import { round } from 'lodash'

import MoviesScore from '../MoviesScore'
import MoviesContext from '../../context/MoviesContext'
import MoviesService from '../../API/MoviesService'

import noPosterAvailable from './images/no-poster.jpg'

import './MoviesCard.css'

const { Title, Text } = Typography

class MoviesCard extends Component {
  static contextType = MoviesContext

  state = {
    rate: 0,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { rate } = this.state
    const { movie } = this.props
    const { guestSessionId } = this.context

    if (prevState.rate !== rate) {
      return await MoviesService.rateMovie(movie.id, guestSessionId, rate)
    }
  }

  dateFormat = (date) => {
    return date ? format(parseISO(date), 'MMMMMM d, yyyy') : null
  }

  textFormat = (data, length) => {
    if (!data) {
      return <Text italic>No overview found</Text>
    } else if (!data || data.length > length) {
      return data.substring(0, (data + ' ').lastIndexOf(' ', length)) + '\u2002...'
    }

    return data
  }

  imageFormat = (imagePath) => {
    return imagePath ? `https://image.tmdb.org/t/p/w200${imagePath}` : ''
  }

  movieTagsFormat = () => {
    const { movie } = this.props
    const { movieTags } = this.context

    return movieTags.filter((tag) => movie.genre_ids.includes(tag.id))
  }

  renderMovieTags = (tags) => {
    if (tags) {
      return tags.map((tag) => (
        <Tag key={tag.id} className="moviesCard__tag">
          {tag.name}
        </Tag>
      ))
    }

    return false
  }

  movieRatingHandler = (value) => {
    this.setState({ rate: value })
  }

  movieRateRender = () => {
    const { rate } = this.state
    const { movie } = this.props

    if ('rating' in movie) {
      return <Rate count={10} allowHalf value={movie.rating} disabled />
    } else {
      return <Rate count={10} allowHalf value={rate} onChange={this.movieRatingHandler} />
    }
  }

  voteFormat = (vote) => {
    return round(vote, 1)
  }

  render() {
    const { movie } = this.props

    this.renderMovieTags()
    return (
      <div className="moviesCard">
        <MoviesScore value={this.voteFormat(movie.vote_average)} />
        <Image
          src={this.imageFormat(movie.poster_path)}
          fallback={noPosterAvailable}
          rootClassName="moviesCard__cover"
          preview={false}
        />
        <div className="moviesCard__info">
          <Title level={4} className="moviesCard__title">
            {movie.title}
          </Title>
          <Text type="secondary">{this.dateFormat(movie.release_date)}</Text>
          <div className="moviesCard__tags">{this.renderMovieTags(this.movieTagsFormat())}</div>
        </div>
        <div className="moviesCard__desc">
          <Text>{this.textFormat(movie.overview, 190)}</Text>
          <div className="moviesCard__rating">{this.movieRateRender()}</div>
        </div>
      </div>
    )
  }
}

export default MoviesCard
