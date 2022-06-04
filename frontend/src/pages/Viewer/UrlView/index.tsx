import React, { useEffect, useState } from 'react'

type Props = {
  fileId: number;
  curPage: number;
}

const UrlView = ({ fileId, curPage }: Props) => {
  const [urlList, setUrlList] = useState<string[]>([]);

  useEffect(() => {

  }, []);

  if(!urlList.length) return <>기다려주세요~</>

  return <>Resource Veiw</>
}

export default UrlView