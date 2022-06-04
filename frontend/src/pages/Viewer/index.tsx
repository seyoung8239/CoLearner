import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestGet } from '../../utils/api';

import UrlView from './UrlView';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js';

type Params = {
  nodeId: string;
}

type GetBase64File = {
  content: string;
  message: string;
}

const Viewer = () => {
  const { nodeId } = useParams<Params>();
  const [fileId, setFileId] = useState<number>();
  const [curPage, setCurPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(100);
  const [base64File, setBase64File] = useState<string>();
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(true);

  useEffect(() => {
    setFileId(parseInt(nodeId as string));
    const fetchFile = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<GetBase64File>
        >(`${apiOrigin}/receive/${fileId}`, {});
        setBase64File(res.data.content);
        setIsLoadingFile(false);
      } catch (e) {
        console.error(e);
      }
    }

    if (fileId) fetchFile();
  }, [fileId]);

  const handleChangePage = (offset: number) => {
    const newPage = curPage + offset;
    if (newPage > 0 && newPage <= endPage) {
      setCurPage(newPage);
    } else
      alert('해당 페이지로는 이동할 수 없습니다.');
  }

  const onDocumentLoadSuccess = (endPage: any) => {
    console.log('endPage', endPage);
    setEndPage(endPage._pdfInfo.numPages);
    setIsLoadingFile(false);
  }

  return (<>
    {!isLoadingFile &&
      <Document file={`data:application/pdf;base64,${base64File}`} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={curPage} />
      </Document>
    }
    <UrlView fileId={fileId!} curPage={curPage} />
    <p>{curPage} / {endPage}</p>
    <button name='before' onClick={() => handleChangePage(-1)}>이전</button>
    <button name='before' onClick={() => handleChangePage(+1)}>다음</button>
  </>)
}

export default Viewer;