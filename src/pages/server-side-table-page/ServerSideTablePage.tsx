import {
  ColumnFiltersState,
  createColumnHelper,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { probisApi, ProbisQuery } from '../../api/probis'
import CustomCard from '../../components/custom-card/CustomCard'
import ServerSideTable from '../../components/custom-table/ServerSideTable'
import { Probis } from '../../data-types/probis'
import { generateErrMessage } from '../../utils/handle-error'

const currentYear = new Date().getFullYear()

export default function ServerSideTablePage() {
  const columnHelper = createColumnHelper<Probis>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('nama_probis', {
        header: () => 'Nama Probis',
        enableColumnFilter: true,
        enableSorting: true,
      }),
      columnHelper.accessor('tahun', {
        header: () => 'Tahun',
        enableColumnFilter: false,
        enableSorting: false,
      }),
    ],
    []
  )

  const [year, setYear] = useState(new Date().getFullYear())

  const [data, setData] = useState<Probis[]>([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [errMessage, setErrMessage] = useState('')

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const fetchData = async () => {
    const offset = pageSize * pageIndex

    setLoading(true)
    setErrMessage('')

    try {
      const query: ProbisQuery = {
        offset,
        limit: pageSize,
        tahun: year,
      }

      // Filter
      for (let i = 0; i < columnFilters.length; i++) {
        const c = columnFilters[i]

        if (c.id === 'nama_probis') {
          query.nama = c.value as string
        }

        if (c.id === 'tahun') {
          query.tahun = parseInt(c.value as string)
        }
      }

      // Sort
      if (sorting.length) {
        query.sort = []

        for (let i = 0; i < sorting.length; i++) {
          const s = sorting[i]
          const identifier = s.desc ? ':DESC' : ':ASC'
          query.sort.push(`${s.id}${identifier}`)
        }
      } else {
        delete query.sort
      }

      const {
        data: { count, rows },
      } = await probisApi.getAll(query)

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
  }, [pageIndex, pageSize, columnFilters, sorting, year])

  // const defaultData = useMemo(() => [], [])

  // const pagination = useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize]
  // )

  // useEffect(() => {
  //   console.log('SORT: ', sorting)
  // }, [sorting])

  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value)
    setYear(newValue)

    setColumnFilters((prev) => {
      const yearFilterIdx = prev.findIndex((f) => f.id === 'tahun')
      if (yearFilterIdx > -1) {
        prev[yearFilterIdx].value = newValue
      } else {
        prev.push({
          id: 'tahun',
          value: newValue,
        })
      }

      return prev
    })

    setPagination((prev) => {
      return {
        ...prev,
        pageIndex: 0,
      }
    })
  }

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-sm-2'>
          <CustomCard>
            <select
              className='form-select'
              value={year}
              onChange={handleChangeYear}
            >
              {[
                currentYear,
                currentYear - 1,
                currentYear - 2,
                currentYear - 3,
                currentYear - 4,
              ].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </CustomCard>
        </div>
      </div>
      <br />
      <div className='row justify-content-center'>
        <div className='col-sm-8'>
          <CustomCard>
            <ServerSideTable
              data={data}
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount}
              columns={columns}
              columnFilters={columnFilters}
              sorting={sorting}
              setColumnFilters={setColumnFilters}
              setPagination={setPagination}
              setSorting={setSorting}
            />
          </CustomCard>
        </div>
      </div>
    </>
  )
}
