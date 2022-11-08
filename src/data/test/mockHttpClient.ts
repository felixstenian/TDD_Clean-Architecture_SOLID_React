import {
  HttpPostClient,
  HttpPostProps
} from '@/data/protocols/http/httpPostClient'
import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(props: HttpPostProps<T>): Promise<HttpResponse<R>> {
    this.url = props.url
    this.body = props.body
    return Promise.resolve(this.response)
  }
}
