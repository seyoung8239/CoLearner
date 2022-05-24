import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestGet, requestFormPost, apiOrigin } from '../../utils/api';
import useStore from '../../store/store';
import { BasicAPIResponseType, getNodesType, postAddFile } from '../../types';

import NodeList from './NodeList';

const Finder = () => {
  const store = useStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const { nodeId } = useParams();
  const dirId: number = nodeId ? parseInt(nodeId) : 0;

  const handleClickAdd = useCallback(
    async () => {
      if (file) {
        const formData = new FormData();
        formData.append("filename", file, file.name);
        const { data } = await requestFormPost<
          BasicAPIResponseType<postAddFile>
        >(apiOrigin + `/upload/${dirId}`, {}, formData);
        if(data.message === 'success')
          console.log('success add dir');
      }
    }, []);

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
        store.load(res.data.nodes);
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
    <button onClick={handleClickAdd}>add file</button>
    <NodeList isLoading={isLoading} />
  </>
}

export default Finder;