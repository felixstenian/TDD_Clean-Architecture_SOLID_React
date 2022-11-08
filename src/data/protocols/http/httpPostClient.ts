import { HttpResponse } from './httpResponse'

export type HttpPostProps<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post(props: HttpPostProps<T>): Promise<HttpResponse<R>>
}
