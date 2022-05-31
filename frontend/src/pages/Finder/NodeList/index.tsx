import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/store';

type Props = {
  isLoading: boolean
  isData: boolean
}

const NodeList = ({ isLoading, isData }: Props) => {
  const store = useStore();
  const navigate = useNavigate();

  const handleClickDir = useCallback((nodeId: number) => {
    navigate(`/finder/${nodeId}`);
  }, []);
  const handleClickFile = useCallback((nodeId: number) => {

  }, []);

  console.log('finder')
  if (!isLoading) return <>Loading...</>
  if (!isData) return <>No Data..</>
  
  return (<>
    {console.log(store.nodes)}  
    {store.nodes.map((node) => (
      node.type === 'DIR' ?
        <div key={node.id} onClick={() => handleClickDir(node.id)}>[DIR]{node.name}</div> :
        <div key={node.id} onClick={() => handleClickFile(node.id)}>[FILE]{node.name}</div>
    ))}
  </>)
}

export default NodeList;