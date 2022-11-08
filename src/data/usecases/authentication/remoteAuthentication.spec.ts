import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

import { mockAuthentication } from '@/domain/test/mockAuthentication'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'

import { RemoteAuthentication } from './remoteAuthentication'

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

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promisse = sut.auth(mockAuthentication())
    expect(promisse).rejects.toThrow(new InvalidCredentialsError())
  })
})
