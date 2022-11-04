import { HttpPostClient } from '../../protocols/http/httpPostClient'
import { RemoteAuthentication } from './remoteAuthentication'

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'http://any'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy) // System ander test
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
