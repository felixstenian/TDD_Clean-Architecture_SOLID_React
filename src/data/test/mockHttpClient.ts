import {
  HttpPostClient,
  HttpPostProps
} from 'data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post(props: HttpPostProps): Promise<void> {
    this.url = props.url
    return Promise.resolve()
  }
}
