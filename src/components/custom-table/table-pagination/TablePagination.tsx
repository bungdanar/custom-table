import { Updater } from '@tanstack/react-table'

interface TablePaginationProps {
  pageIndex: number
  pageCount: number
  setPageIndex: (updater: Updater<number>) => void
  handlePrevPage: () => void
  handleNextPage: () => void
  canPrevPage: boolean
  canNextPage: boolean
}

export default function TablePagination({
  pageIndex,
  pageCount,
  setPageIndex,
  handlePrevPage,
  handleNextPage,
  canPrevPage,
  canNextPage,
}: TablePaginationProps) {
  return (
    <div className='row'>
      <div className='col'>
        <span className='align-midle'>
          Page {pageIndex + 1} of {pageCount}
        </span>
      </div>
      <div className='col'>
        <div className='input-group'>
          <div>
            <span className='align-middle me-2'>Go to Page</span>
          </div>
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              setPageIndex(page)
            }}
            className='form-control'
          />
        </div>
      </div>
      <div className='col'>
        <div className='row'>
          <div className='col d-grid'>
            <button
              className='btn btn-success btn-sm'
              onClick={handlePrevPage}
              disabled={!canPrevPage}
            >
              Previous
            </button>
          </div>
          <div className='col d-grid'>
            <button
              className='btn btn-success btn-sm'
              onClick={handleNextPage}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
