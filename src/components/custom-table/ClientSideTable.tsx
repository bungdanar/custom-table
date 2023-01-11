import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import TableBody from './table-body/TableBody'
import TableContainer from './table-container/TableContainer'
import TableHead from './table-head/TableHead'
import TablePagination from './table-pagination/TablePagination'

interface ClientSideTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
}

export default function ClientSideTable<T>({
  data,
  columns,
}: ClientSideTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
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
  )
}
