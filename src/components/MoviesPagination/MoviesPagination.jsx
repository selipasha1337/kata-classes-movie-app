import { Component } from 'react'
import { Pagination } from 'antd'

import styles from './MoviesPagination.module.css'

class MoviesPagination extends Component {
  render() {
    return (
      <div className={styles.moviesPagination}>
        {/*<Pagination defaultCurrent={1} showSizeChanger={false} hideOnSinglePage />*/}
        <Pagination defaultCurrent={1} showSizeChanger={false} total={5000} />
      </div>
    )
  }
}

export default MoviesPagination
