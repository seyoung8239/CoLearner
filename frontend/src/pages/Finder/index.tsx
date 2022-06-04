import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestGet, requestFormPost, apiOrigin } from '../../utils/api';
import useStore from '../../store/store';
import { BasicAPIResponseType, getNodesType, UploadType } from '../../types';

import NodeList from './NodeList';
import DirAddModal from './DirAddModal';

const Finder = () => {
  const store = useStore();

  const [isData, setIsData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [file, setFile] = useState<File>();
  const { nodeId } = useParams();
  const dirId: number = nodeId ? parseInt(nodeId) : 0;

  const handleUploadFile = useCallback(
    async () => {
      console.log(file);
      console.log('upload~');
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        const { data } = await requestFormPost<
          BasicAPIResponseType<UploadType>
        >(apiOrigin + `/upload/${dirId}`, {}, formData);
        if (data.message === 'success')
          console.log('success add dir');
      }
    }, [file, nodeId]);

  const handleChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let newFile = event.target.files![0]
    setFile(newFile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await requestGet<
          BasicAPIResponseType<getNodesType>
        >(apiOrigin + `/finder/${dirId}`, {});
        if (res.data.files.length) {
          setIsData(true);
          store.load(res.data.files);
        }
        console.log(res.data.files);
        setIsLoading(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return <>
    <h1>Finder</h1>
    <input type="file" onChange={handleChangeFile} />
    <button onClick={handleUploadFile}>파일 업로드 하기</button>
    <button onClick={e=>setIsModalOpen(true)}>새로운 디렉터리 생성</button>
    <NodeList isLoading={isLoading} isData={isData} />
    <DirAddModal dirId={dirId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
}

export default Finder;