import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { makeData, Person } from '../../utils/makeData'
import TableBody from './table-body/TableBody'
import TableContainer from './table-container/TableContainer'
import TableHead from './table-head/TableHead'
import TablePagination from './table-pagination/TablePagination'

export default function ClientSideTable() {
  const [data, setData] = useState<Person[]>(() => makeData(100))

  const columnHelper = createColumnHelper<Person>()

  const columns = [
    columnHelper.accessor('firstName', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'lastName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('visits', {
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
    }),
    columnHelper.accessor('progress', {
      header: 'Profile Progress',
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <TableContainer>
        <TableHead headerGroups={table.getHeaderGroups()} />
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
  )
}
