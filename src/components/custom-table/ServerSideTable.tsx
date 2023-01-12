import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import TableBody from './table-body/TableBody'
import TableContainer from './table-container/TableContainer'
import TableHead from './table-head/TableHead'
import TablePagination from './table-pagination/TablePagination'

interface ServerSideTableProps<T> {
  data: T[]
  pageIndex: number
  pageSize: number
  columns: ColumnDef<T, any>[]
  pageCount: number
  columnFilters: ColumnFiltersState | undefined
  sorting: SortingState | undefined
  setPagination: OnChangeFn<PaginationState> | undefined
  setColumnFilters: OnChangeFn<ColumnFiltersState> | undefined
  setSorting: OnChangeFn<SortingState> | undefined
}

export default function ServerSideTable<T>({
  data,
  pageIndex,
  pageSize,
  columns,
  pageCount,
  columnFilters,
  sorting,
  setPagination,
  setColumnFilters,
  setSorting,
}: ServerSideTableProps<T>) {
  const defaultData = useMemo(() => [], [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    isMultiSortEvent: () => true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
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
