import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { BasicAPIResponseType, UploadType } from '../../types';
import { apiOrigin, requestFormPost, requestGet } from '../../utils/api';

import GuestUrlView from './GuestUrlView'
import "./guest.css";

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
    const uploadFile = async () => {
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file, file.name);
          const { data } = await requestFormPost<
            BasicAPIResponseType<UploadType>
          >(apiOrigin + '/guest', {}, formData);
          if(data.message === 'success') {
            console.log('file upload success');
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    uploadFile();
  }, [file]);

  return (<>
    <div className="contents">

      <div className="viewer">
        <div className="titlebar">파일 이름</div>
        {isLoadingFile ?
          <div className="uploadms">
            파일을 업로드 해주세요 😊
          </div> :
          <Document file={base64File} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
            <Page pageNumber={curPage} />
          </Document>
        }

        <GuestUrlView curPage={curPage} />
        <div className="btnbar">
          <button className="backbtn" name='before' onClick={() => handleChangePage(-1)}>이전</button>
          <p>{curPage} / {endPage}</p>
          <button className="nextbtn" name='before' onClick={() => handleChangePage(+1)}>다음</button>
        </div>
        <div className="uploadbar">
          <input className="file" type="file" onChange={handleChangeFile} />
          <button className="upload" onClick={handleUploadFile}>파일열기</button>
        </div>
      </div>

      <div className="urlviewer">
        <div className="urltitle">추천 자료</div>
        <div className="url"> 자료 1 </div>
        <div className="url"> 자료 2 </div>
        <div className="url"> 자료 3</div>
      </div>

    </div>
  </>)


}

export default Guest;

