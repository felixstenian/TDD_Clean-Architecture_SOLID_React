import axios from 'axios'
import { faker } from '@faker-js/faker'

import { HttpPostProps } from '@/data/protocols/http'

import { AxiosHttpClientAdapter } from '.'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.database.collation(),
  status: faker.random.numeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClientAdapter => {
  return new AxiosHttpClientAdapter()
}
const mockPostRequest = (): HttpPostProps<unknown> => ({
  url: faker.internet.url(),
  body: faker.database.collation()
})

describe('AxiosHttpClientAdapter', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode ans body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
