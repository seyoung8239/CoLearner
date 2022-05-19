import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestGet, apiOrigin } from '../../utils/api';
import useStore from '../../store/store';
import { BasicAPIResponseType, getNodesType } from '../../types';

import NodeList from './NodeList';

const Finder = () => {
  const store = useStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { nodeId } = useParams();
  const dirId:number = nodeId ? parseInt(nodeId) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res  = await requestGet<BasicAPIResponseType<getNodesType>>(apiOrigin + `/finder/${dirId}`, {});
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
    <NodeList isLoading={isLoading} />
  </>
}

export default Finder;