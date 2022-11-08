import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remoteAuthentication'
import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import { mockAuthentication } from '@/domain/test/mockAuthentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy) // System ander test
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationProps = mockAuthentication()
    await sut.auth(authenticationProps)
    expect(httpPostClientSpy.body).toEqual(authenticationProps)
  })
})
