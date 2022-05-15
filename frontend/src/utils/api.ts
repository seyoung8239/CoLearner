import axios, { AxiosError } from 'axios';
import { resolve } from 'path';

import { BasicAPIResponseType } from '../types';

export const apiOrigin = "http://localhost:5000"

// export const apiRoute = {};

export function requestGet<T>(url: string, header: object) {
  return new Promise<T>((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then(res => {
        console.log("get res: ", res);
        const returnVal = {...res} as BasicAPIResponseType<T>;
        resolve(returnVal as T);
      })
      .catch((e: AxiosError) => {
        console.error(e.response?.data);
        console.error(e.response?.status);
        reject(e);
      })
  });
}