import {
  HttpPostClient,
  HttpPostProps
} from 'data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post(props: HttpPostProps): Promise<void> {
    this.url = props.url
    this.body = props.body
    return Promise.resolve()
  }
}
