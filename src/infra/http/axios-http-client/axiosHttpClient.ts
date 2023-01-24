import axios from 'axios'

import { HttpPostProps } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post(params: HttpPostProps<unknown>): Promise<void> {
    await axios(params.url)
  }
}
