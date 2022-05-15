export type BasicAPIResponseType<T> = {
  data: T;
  status: number;
  statusText: string;
  config: {
    url: string
  };
  headers: object;
  request: object;
}