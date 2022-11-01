import { Component } from 'react'
import { Pagination } from 'antd'

import styles from './MoviesPagination.module.css'

class MoviesPagination extends Component {
  totalPageFormat = (pagesCount) => {
    return pagesCount >= 500 ? 500 : pagesCount
  }

  render() {
    const { handlePagination, pageNumber, totalPages } = this.props

    return (
      <div className={styles.moviesPagination}>
        <Pagination
          defaultCurrent={1}
          showSizeChanger={false}
          current={pageNumber}
          defaultPageSize={1}
          total={this.totalPageFormat(totalPages)}
          onChange={handlePagination}
          hideOnSinglePage
        />
      </div>
    )
  }
}

export default MoviesPagination
