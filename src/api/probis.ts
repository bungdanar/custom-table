import { Probis } from '../data-types/probis'
import { request } from '../utils/handle-request'

type ProbisQuery = {
  limit: number
  offset: number
  tahun: number
  nama?: string
}

export const probisApi = {
  getAll: (params: ProbisQuery) =>
    request.get<{
      count: number
      rows: Probis[]
    }>('/api/probis', params),
}
