import React, { useEffect, useState } from 'react'
import { BasicAPIResponseType } from '../../../types';

import { apiOrigin, requestGet } from '../../../utils/api';

type Props = {
  curPage: number;
}

type GetUrls = {
  links: string[];
  message: string;
}

const GuestUrlView = ({ curPage }: Props) => {
  const [urlList, setUrlList] = useState<string[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<GetUrls>
        >(`${apiOrigin}/viewer/-1/${curPage}`, {});
        setUrlList(res.data.links);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUrls();
  }, [curPage]);

  if (!urlList.length) return <>Loading...</>

  return <>
    <p>공부자료 목록</p>
    {urlList.map((el, i) =>
      <a href={el} key={i}>{el}</a>
    )}
  </>
}

export default GuestUrlView;