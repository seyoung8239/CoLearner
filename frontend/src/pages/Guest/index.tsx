import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestGet } from '../../utils/api';

import GuestUrlView from './GuestUrlView'
import "./guest.css";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"; 

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js';

const Guest = () => {
  const [file, setFile] = useState<File>();
  const [curPage, setCurPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(100);
  const [base64File, setBase64File] = useState<string>();
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(true);

  useEffect(() => {

  }, []);

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
  }

  const handleChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let newFile = event.target.files![0]
    setFile(newFile);
  }, []);

  const handleUploadFile = useCallback(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file! as Blob);
    reader.onload = () => {
      console.log(reader.result)
      setBase64File(reader.result as string);
      setIsLoadingFile(false);
    }
  }, [file]);

  return (<>
  <div className = "contents">

  <div className = "viewer">
  <div className = "titlebar">파일 이름</div>
    {isLoadingFile ?
      <div className = "uploadms">
        파일을 업로드 해주세요
      </div> :
      <Document file={base64File} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={curPage} />
      </Document>
    }

    <div className = "btnbar">
    <button className = "backbtn" name='before' onClick={() => handleChangePage(-1)}><FaChevronLeft size="20"/></button>
    <p>{curPage} / {endPage}</p> 
    <button className = "nextbtn"name='before' onClick={() => handleChangePage(+1)}><FaChevronRight size="20"/></button>
    </div>

   <div className = "uploadbar">
    <input className = "file" type="file"  onChange={handleChangeFile} />
    <button className = "upload" onClick={handleUploadFile}>파일열기</button>
    </div>
    </div>
    <div className = "urlviewer">
    <GuestUrlView curPage={curPage} />
    </div>
    </div>
  </>)


}

export default Guest;

