import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/store';

type Props = {
  isLoading: boolean
}

const NodeList = ({ isLoading }: Props) => {
  const store = useStore();
  const navigate = useNavigate();

  const handleClickDir = useCallback((nodeId: number) => {
    navigate(`/finder/${nodeId}`);
  }, []);
  const handleClickFile = useCallback((nodeId: number) => {

  }, []);

  if (!isLoading) return <>Loading...</>

  return (<>
    {store.nodes.map((node) => (
      node.isDir ?
        <div key={node.nodeId} onClick={() => handleClickFile(node.nodeId)}>[Dir]{node.name}</div> :
        <div key={node.nodeId} onClick={() => handleClickDir(node.nodeId)}>[File]{node.name}</div>
    ))}
  </>)
}

export default NodeList;