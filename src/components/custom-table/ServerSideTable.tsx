import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { probisApi } from '../../api/probis'
import { Probis } from '../../data-types/probis'
import { generateErrMessage } from '../../utils/handle-error'
import CustomCard from '../custom-card/CustomCard'
import TableBody from './table-body/TableBody'
import TableContainer from './table-container/TableContainer'
import TableHead from './table-head/TableHead'
import TablePagination from './table-pagination/TablePagination'

export default function ServerSideTable() {
  const columnHelper = createColumnHelper<Probis>()

  const columns = [
    columnHelper.accessor('nama_probis', {
      header: () => 'Nama Probis',
      enableColumnFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor('tahun', {
      header: () => 'Tahun',
      enableColumnFilter: false,
      enableSorting: false,
    }),
  ]

  const [data, setData] = useState<Probis[]>([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [errMessage, setErrMessage] = useState('')

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const fetchData = async () => {
    const offset = pageSize * pageIndex

    setLoading(true)
    setErrMessage('')

    try {
      const {
        data: { count, rows },
      } = await probisApi.getAll({
        offset,
        limit: pageSize,
        // tahun: new Date().getFullYear()
        tahun: 2022,
      })

      setData(rows)
      setPageCount(Math.ceil(count / pageSize))
      setRowCount(count)
      setLoading(false)
    } catch (error) {
      setErrMessage(generateErrMessage(error))
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageIndex, pageSize])

  const defaultData = useMemo(() => [], [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-8'>
        <CustomCard>
          <div>
            <TableContainer>
              <TableHead headerGroups={table.getHeaderGroups()} table={table} />
              <TableBody rowModel={table.getRowModel()} />
            </TableContainer>
            <TablePagination
              pageIndex={table.getState().pagination.pageIndex}
              pageCount={table.getPageCount()}
              setPageIndex={table.setPageIndex}
              handlePrevPage={table.previousPage}
              handleNextPage={table.nextPage}
              canPrevPage={table.getCanPreviousPage()}
              canNextPage={table.getCanNextPage()}
            />
          </div>
        </CustomCard>
      </div>
    </div>
  )
}
