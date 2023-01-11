import { flexRender, HeaderGroup } from '@tanstack/react-table'

interface TableHeadProps<T> {
  headerGroups: HeaderGroup<T>[]
}

export default function TableHead<T>({ headerGroups }: TableHeadProps<T>) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
