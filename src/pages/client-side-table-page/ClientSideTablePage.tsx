import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import CustomCard from '../../components/custom-card/CustomCard'
import ClientSideTable from '../../components/custom-table/ClientSideTable'
import { makeData, Person } from '../../utils/makeData'

export default function ClientSideTablePage() {
  const [data, setData] = useState<Person[]>(() => makeData(100))

  const columnHelper = createColumnHelper<Person>()

  const columns = [
    columnHelper.accessor('firstName', {
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'lastName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      enableColumnFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: (info) => info.renderValue(),
      enableColumnFilter: true,
      enableSorting: true,
    }),
    columnHelper.accessor('visits', {
      header: () => <span>Visits</span>,
      enableColumnFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      enableColumnFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor('progress', {
      header: 'Profile Progress',
      enableColumnFilter: false,
      enableSorting: false,
    }),
  ]

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-8'>
        <CustomCard>
          <ClientSideTable data={data} columns={columns} />
        </CustomCard>
      </div>
    </div>
  )
}
