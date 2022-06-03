import internal from "stream";

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
  cdi: number;
  files: Node[];
  message: string;
  uid: string
}
export interface Node {
  id: number;
  name: string;
  parent: number;
  type: string;
}

export type UploadType = {
  message: string;
  id: number;
  file_info: object;
}