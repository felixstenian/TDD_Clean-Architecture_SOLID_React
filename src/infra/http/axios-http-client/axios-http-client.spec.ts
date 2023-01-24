import { HttpPostProps } from './../../../data/protocols/http/httpPostClient'
import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from '.'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostProps<unknown> => ({
  url: faker.internet.url(),
  body: faker.database.collation()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
