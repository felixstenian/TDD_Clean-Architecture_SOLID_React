import {
  HttpPostClient,
  HttpPostProps
} from '@/data/protocols/http/httpPostClient'
import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post(props: HttpPostProps): Promise<HttpResponse> {
    this.url = props.url
    this.body = props.body
    return Promise.resolve(this.response)
  }
}
