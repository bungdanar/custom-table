import { flexRender, RowModel } from '@tanstack/react-table'

interface TableBodyProps<T> {
  rowModel: RowModel<T>
}

export default function TableBody<T>({ rowModel }: TableBodyProps<T>) {
  return (
    <tbody>
      {rowModel.rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
