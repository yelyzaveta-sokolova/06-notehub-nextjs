'use client'

import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName=""
      pageLinkClassName=""
      previousLabel="<"
      nextLabel=">"
    />
  )
}
