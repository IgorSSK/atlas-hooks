import { UnauthorizedError, ForbiddenError, ServerError } from '@application/errors/http'

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export const ok = (data: any): HttpResponse<string> => ({
  statusCode: 200,
  body: JSON.stringify(data)
})

export const badRequest = (error: Error): HttpResponse<string> => ({
  statusCode: 400,
  body: JSON.stringify(error)
})

export const unauthorized = (): HttpResponse<string> => ({
  statusCode: 401,
  body: JSON.stringify(new UnauthorizedError())
})

export const forbidden = (): HttpResponse<string> => ({
  statusCode: 403,
  body: JSON.stringify(new ForbiddenError())
})

export const serverError = (error: unknown): HttpResponse<string> => ({
  statusCode: 500,
  body: JSON.stringify(new ServerError(error instanceof Error ? error : undefined))
})
