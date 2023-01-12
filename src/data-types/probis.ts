import { RefProbisKesimpulanEnum } from './ref-probis-kesimpulan'

export interface Probis {
  id: number
  kode_eselon_satu: string
  tahun: number
  createdAt: Date
  updatedAt: Date
  created_by: number
  updated_by: number
  nomor_probis: number
  kode_probis: string
  nama_probis: string
  kesimpulan_id: RefProbisKesimpulanEnum
}
