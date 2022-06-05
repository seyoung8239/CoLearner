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
    {urlList.map((el, i) =>
      <iframe src={el.url} frameBorder="0" key={i}></iframe>
    )}
  </>
}

export default UrlView;