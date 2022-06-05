import React, { useEffect, useState } from 'react'
import { BasicAPIResponseType } from '../../../types';
import { apiOrigin, requestGet } from '../../../utils/api';

type Props = {
  fileId: number;
  curPage: number;
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

const UrlView = ({ fileId, curPage }: Props) => {
  const [urlList, setUrlList] = useState<LinkType[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<GetUrls>
        >(`${apiOrigin}/viewer/${fileId}/${curPage}`, {});
        setUrlList(res.data.links);
      } catch (e) {
        console.error(e);
      }
    }
    if (fileId) fetchUrls();
  }, [fileId, curPage]);

  if (!urlList.length) return <>Loading...</>
  console.log(urlList)
  return <>
    <p>공부자료 목록</p>
    <ul>
      {urlList.map((el, i) =>
        el.type === 'youtube' ?
          <li key={i}><iframe src={el.url} frameBorder="0" title={i.toString()}></iframe></li> :
          <li key={i}><a href={el.url} key={i} target='_blank' rel="noreferrer">{el.title}</a></li>
      )}
    </ul>
  </>
}

export default UrlView;