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

export type getNodesType = {
  nodes: Node[]
}
export interface Node {
  nodeId: number;
  name: string;
  isDir: boolean;
}

export type UploadType = {
  message: string;
  id: number;
  file_info: object;
}