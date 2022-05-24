import axios, { AxiosError } from 'axios';
import { resolve } from 'path';

import { BasicAPIResponseType } from '../types';

export const apiOrigin = "http://localhost:5000"

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
        const returnVal = {...res} as unknown;
        resolve(returnVal as T);
      })
      .catch((e: AxiosError) => {
        console.error(e.response?.data);
        console.error(e.response?.status);
        reject(e);
      })
  });
}

export function requestFormPost<T>(url: string, header: object, form: FormData) {
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      })
      .then((res)=> {
        const returnVal = {...res} as unknown;
        resolve(returnVal as T);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        console.error(error.response?.status);
        reject(error);
      });
  });
}