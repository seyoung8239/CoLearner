/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestGet, requestFormPost, apiOrigin } from '../../utils/api';
import useStore from '../../store/store';
import { BasicAPIResponseType, getNodesType, UploadType } from '../../types';

import NodeList from './NodeList';
import DirAddModal from './DirAddModal';

import "./finder.css"

const Finder = () => {
  const store = useStore();

  const [isData, setIsData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [file, setFile] = useState<File>();
  const { nodeId } = useParams();
  const [dirId, setDirId] = useState<number>(parseInt(nodeId!))

  const handleUploadFile = useCallback(
    async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        const { data } = await requestFormPost<
          BasicAPIResponseType<UploadType>
        >(apiOrigin + `/upload/${dirId}`, {"Cookie": store.cookie, 'secure': true}, formData);
        if (data.message === 'success') {
          console.log('success add dir');
          window.location.reload();
        }
      }
    }, [file, dirId]);

  const handleChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let newFile = event.target.files![0]
    setFile(newFile);
  }, []);

  useEffect(() => {
    console.log('effect')
    const fetchData = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<getNodesType>
        >(apiOrigin + `/finder/${dirId}`, {'secure': true});
        const isDataTemp = res.data.files.length ? true : false;
        setIsData(isDataTemp);
        store.load(res.data.files);;
        setIsLoading(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [dirId]);

  console.log(dirId)
  return <>
    {store.name && <div className="username">{store.name}님의 파일목록</div>}
    <div className="newbar">
      <input id='file_input' type="file" onChange={handleChangeFile} />
      <button className="fileupload" onClick={handleUploadFile}>새 파일 추가</button>
      <button className="newdr" onClick={e => setIsModalOpen(true)}>새 폴더 추가</button>
    </div>
    <DirAddModal dirId={dirId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    <div className="nodelist">
      <NodeList isLoading={isLoading} isData={isData} setDirId={setDirId} />
    </div>
  </>
}

export default React.memo(Finder);