import { getErrorMessage } from './get-err-message'

type RequestErrorPayload = {
  message: string
  statusCode: number
}

class RequestError extends Error {
  private statusCode: number

  constructor(payload: RequestErrorPayload) {
    super(payload.message)
    this.statusCode = payload.statusCode

    Object.setPrototypeOf(this, RequestError.prototype)
  }

  public serialize(): { message: string; statusCode: number } {
    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}

export const handleRequestErr = (err: any) => {
  if (err.response) {
    throw new RequestError(err.response.data)
  } else {
    throw new RequestError({
      statusCode: 408,
      message: 'Request Timeout',
    })
  }
}

// This function must be called inside the catch block
export const generateErrMessage = (err: unknown): string => {
  let errMessage: string

  if (err instanceof RequestError) {
    errMessage = err.serialize().message
  } else {
    errMessage = getErrorMessage(err)

    if (process.env.NODE_ENV !== 'production') {
      console.error(errMessage)
    }
  }

  return errMessage
}
