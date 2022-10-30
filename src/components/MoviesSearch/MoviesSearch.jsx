import { Component } from 'react'
import { Input } from 'antd'

class MoviesSearch extends Component {
  render() {
    return (
      <Input placeholder="Type to search..." size="large" value={this.props.search} onChange={this.props.onChange} />
    )
  }
}

export default MoviesSearch
