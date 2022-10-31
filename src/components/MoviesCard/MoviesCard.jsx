import { Component } from 'react'
import { Typography, Tag, Rate, Image } from 'antd'
import { format, parseISO } from 'date-fns'

import MoviesScore from '../MoviesScore'
import MoviesContext from '../../context/MoviesContext'

const { Title, Text } = Typography
import noPosterAvailable from './images/no-poster.jpg'
import './MoviesCard.css'

class MoviesCard extends Component {
  static contextType = MoviesContext

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

  MovieTagsFormat = () => {
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

  render() {
    const { movie } = this.props

    this.renderMovieTags()
    return (
      <div className="moviesCard">
        <MoviesScore value={movie.vote_average} />
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
          <div className="moviesCard__tags">{this.renderMovieTags(this.MovieTagsFormat())}</div>
        </div>
        <div className="moviesCard__desc">
          <Text>{this.textFormat(movie.overview, 190)}</Text>
          <div className="moviesCard__rating">
            <Rate defaultValue={0} count={10} allowHalf />
          </div>
        </div>
      </div>
    )
  }
}

// MoviesCard.contextType = MoviesContext

export default MoviesCard
