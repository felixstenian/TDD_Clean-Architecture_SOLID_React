import { faker } from '@faker-js/faker'

import { AuthenticationProps } from '@/domain/usecases/authentication'
import { AccountModel } from '../models/accountModel'

export const mockAuthentication = (): AuthenticationProps => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
