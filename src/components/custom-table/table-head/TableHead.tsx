import {
  Column,
  flexRender,
  HeaderGroup,
  Table as ReactTable,
} from '@tanstack/react-table'

interface TableHeadProps<T> {
  headerGroups: HeaderGroup<T>[]
  table: ReactTable<any>
}

export default function TableHead<T>({
  headerGroups,
  table,
}: TableHeadProps<T>) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder ? null : (
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: ReactTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <input
      type='number'
      value={(columnFilterValue as [number, number])?.[0] ?? ''}
      onChange={(e) =>
        column.setFilterValue(() => [e.target.value, e.target.value])
      }
      placeholder={`Search`}
      className='w-36 border shadow rounded'
    />
  ) : (
    <input
      type='text'
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className='w-36 border shadow rounded'
    />
  )
}
