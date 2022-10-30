import { Component } from 'react'
import { Pagination } from 'antd'

import styles from './MoviesPagination.module.css'

class MoviesPagination extends Component {
  totalPageFormat = (pagesCount) => {
    return pagesCount * 10 > 500 ? 5000 : pagesCount * 10
  }

  render() {
    const { handlePagination, pageNumber, totalPages } = this.props

    return (
      <div className={styles.moviesPagination}>
        <Pagination
          defaultCurrent={1}
          showSizeChanger={false}
          current={pageNumber}
          total={this.totalPageFormat(totalPages)}
          onChange={handlePagination}
          hideOnSinglePage
        />
      </div>
    )
  }
}

export default MoviesPagination
