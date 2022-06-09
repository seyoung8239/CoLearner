import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestGet } from '../../utils/api';

import UrlView from './UrlView';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"; 
import '../../sytles/viewer.css'


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
  }, [fileId, nodeId]);

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


<div className="contents">

    <div className="viewer">
      <div className="titlebar">파일 이름</div>

      {!isLoadingFile &&
        <Document file={`data:application/pdf;base64,${base64File}`} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
          <Page pageNumber={curPage} />
        </Document>
      }
      <div className="btnbar">
      <button className = "backbtn" name='before' onClick={() => handleChangePage(-1)}><FaChevronLeft size="20"/></button>
    <p>{curPage} / {endPage}</p> 
    <button className = "nextbtn"name='before' onClick={() => handleChangePage(+1)}><FaChevronRight size="20"/></button>
      </div>
      </div>

      <div className = "urlviewer">
      <UrlView fileId={fileId!} curPage={curPage} />
    </div>
    </div>
  </>)
}

export default Viewer;