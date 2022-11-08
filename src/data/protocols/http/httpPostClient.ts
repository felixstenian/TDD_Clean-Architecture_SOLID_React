export type HttpPostProps = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(props: HttpPostProps): Promise<void>
}
