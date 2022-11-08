import { HttpResponse } from './httpResponse'

export type HttpPostProps = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(props: HttpPostProps): Promise<HttpResponse>
}
