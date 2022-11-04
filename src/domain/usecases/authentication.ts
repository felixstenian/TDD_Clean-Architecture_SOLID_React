import { AccountModel } from 'domain/models/account-model'

type AuthenticationProps = {
  email: string
  password: string
}

export interface Authentication {
  auth(props: AuthenticationProps): Promise<AccountModel>
}
