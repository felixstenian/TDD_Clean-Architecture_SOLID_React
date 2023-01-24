import axios from 'axios'

import { HttpPostProps } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post({ url, body }: HttpPostProps<unknown>): Promise<void> {
    await axios.post(url, body)
  }
}
