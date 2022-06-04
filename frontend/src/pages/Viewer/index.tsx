import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestGet } from '../../utils/api';

import ResourceView from './UrlView';

type Params = {
  nodeId: string;
}

const Viewer = () => {
  const { nodeId } = useParams<Params>();
  const [fileId, setFileId] = useState<number>();
  const [curPage, setCurPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(100);
  const [base64File, setBase64File] = useState<string>();
  const [urlFile, setUrlFile] = useState<string>();
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(true);

  useEffect(() => {
    setFileId(parseInt(nodeId as string));

    const fetchFile = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<string>
        >(apiOrigin + `/receive/${fileId}`, {});
        setBase64File(res.data);
        setIsLoadingFile(false);
        console.log(res.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (fileId)
      fetchFile();
  }, [fileId]);

  useEffect(() => {
    if (base64File) {
      const decodedRawFile = window.atob(base64File!);
      const len = decodedRawFile.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        var ascii = decodedRawFile.charCodeAt(i);
        bytes[i] = ascii;
      }

      let blob = new Blob([bytes], { type: "application/pdf" });
      let link = window.URL.createObjectURL(blob);
      setUrlFile(link);
      setIsLoadingFile(false);
    }
  }, [base64File]);


  const handleChangePage = (offset: number) => {
    const newPage = curPage + offset;
    if (newPage > 0 && newPage < endPage) {
      setCurPage(newPage);
    } else
      alert('해당 페이지로는 이동할 수 없습니다.');
  }

  const onDocumentLoadSuccess = (endPage: any) => {
    console.log('endPage', endPage);
    setEndPage(endPage);
    setIsLoadingFile(false);
  }

  return (<>
    {!isLoadingFile &&
      <Document file={urlFile} onLoadSuccess={onDocumentLoadSuccess} >
        <Page pageNumber={curPage} />
      </Document>
    }
    <ResourceView />
    <p>{curPage} / {endPage}</p>
    <button name='before' onClick={() => handleChangePage(-1)}>이전</button>
    <button name='before' onClick={() => handleChangePage(+1)}>다음</button>
  </>)
}

export default Viewer;