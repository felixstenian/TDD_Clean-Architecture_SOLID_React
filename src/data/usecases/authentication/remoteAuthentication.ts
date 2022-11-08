import { AuthenticationProps } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http/httpPostClient'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(props: AuthenticationProps): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: props
    })
  }
}
