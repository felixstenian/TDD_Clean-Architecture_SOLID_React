import { RemoteAuthentication } from './remoteAuthentication'
import { HttpPostClientSpy } from '../../test/mockHttpClient'

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = 'http://any'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy) // System ander test
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
