import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { handleRequestErr } from './handle-error'

function getProdServerHost() {
  const port = window.location.port
  const protocol = window.location.protocol

  // PORT EXISTS
  if (port !== '') {
    return `${protocol}//${window.location.host}`
  } else {
    return `${protocol}//${window.location.hostname}`
  }
}

function getServerBaseUrl() {
  const serverBaseUrl =
    import.meta.env.MODE === 'production'
      ? getProdServerHost()
      : import.meta.env.VITE_SERVER_URL

  const subdomain = import.meta.env.VITE_SUBDOMAIN_URL

  return subdomain ? `${serverBaseUrl}/${subdomain}` : serverBaseUrl
}

export const request = {
  get: <T>(
    url: string,
    params: Object = {},
    additionalConfig: AxiosRequestConfig = {}
  ) =>
    axios
      .get<T>(`${getServerBaseUrl()}${url}`, {
        withCredentials: true,
        params,
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
        },
        ...additionalConfig,
      })
      .catch((err) => handleRequestErr(err)),

  post: <T>(
    url: string,
    payload: Object = {},
    additionalConfig: AxiosRequestConfig = {}
  ) =>
    axios
      .post<T>(`${getServerBaseUrl()}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleRequestErr(err)),

  put: <T>(
    url: string,
    payload: Object = {},
    additionalConfig: AxiosRequestConfig = {}
  ) =>
    axios
      .put<T>(`${getServerBaseUrl()}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleRequestErr(err)),

  patch: <T>(
    url: string,
    payload: Object = {},
    additionalConfig: AxiosRequestConfig = {}
  ) =>
    axios
      .patch<T>(`${getServerBaseUrl()}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleRequestErr(err)),

  delete: <T>(url: string, additionalConfig: AxiosRequestConfig = {}) =>
    axios
      .delete<T>(`${getServerBaseUrl()}${url}`, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleRequestErr(err)),
}
