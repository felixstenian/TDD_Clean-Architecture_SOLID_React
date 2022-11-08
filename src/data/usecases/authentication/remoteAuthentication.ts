import { UnexpectedError } from '@/domain/errors/unexpectedError'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { AuthenticationProps } from '@/domain/usecases/authentication'

import { HttpPostClient } from '@/data/protocols/http/httpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { AccountModel } from '@/domain/models/accountModel'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationProps,
      AccountModel
    >
  ) {}

  async auth(props: AuthenticationProps): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: props
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
