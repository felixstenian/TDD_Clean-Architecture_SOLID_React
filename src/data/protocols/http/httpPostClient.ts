export type HttpPostProps = {
  url: string
}

export interface HttpPostClient {
  post(props: HttpPostProps): Promise<void>
}
