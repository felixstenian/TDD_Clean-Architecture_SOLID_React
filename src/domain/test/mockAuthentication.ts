import { faker } from '@faker-js/faker'

import { AuthenticationProps } from '@/domain/usecases/authentication'

export const mockAuthentication = (): AuthenticationProps => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
