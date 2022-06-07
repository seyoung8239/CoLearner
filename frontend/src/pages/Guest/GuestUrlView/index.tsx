import React, { useEffect, useState } from 'react'
import { BasicAPIResponseType } from '../../../types';

import { apiOrigin, requestGet } from '../../../utils/api';

type Props = {
  curPage: number;
  isReqed: boolean;
}

type GetUrls = {
  links: LinkType[];
  message: string;
}

type LinkType = {
  title: string;
  type: string;
  url: string;
}

const GuestUrlView = ({ curPage, isReqed }: Props) => {
  const [urlList, setUrlList] = useState<LinkType[]>([]);
  const [isData, setIsData] = useState<boolean>(false);


  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<GetUrls>
        >(`${apiOrigin}/viewer/-1/${curPage}`, {});
        console.log(res);
        setUrlList(res.data.links);
        setIsData(true);
      } catch (e) {
        console.error(e);
      }
    }
    if (isReqed) fetchUrls();
  }, [curPage, isReqed]);

  if (!isData) return <></>

  return <>
    <p>공부자료 목록</p>
    {urlList.map((el, i) =>
      el.type === 'youtube' ?
        <li key={i}><iframe src={el.url} frameBorder="0" title={i.toString()}></iframe></li> :
        <li key={i}><a href={el.url} key={i} target='_blank' rel="noreferrer">{el.title}</a></li>)
    }
  </>
}

export default GuestUrlView;