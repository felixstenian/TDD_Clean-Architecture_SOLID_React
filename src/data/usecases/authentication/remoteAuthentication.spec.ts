import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

import { mockAccountModel, mockAuthentication } from '@/domain/test/mockAccount'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/unexpectedError'

import { RemoteAuthentication } from './remoteAuthentication'
import { AuthenticationProps } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/accountModel'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationProps, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationProps,
    AccountModel
  >()
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

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promisse = sut.auth(mockAuthentication())
    expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promisse = sut.auth(mockAuthentication())
    expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promisse = sut.auth(mockAuthentication())
    expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
