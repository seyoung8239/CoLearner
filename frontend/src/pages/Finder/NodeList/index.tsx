import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/store';

type Props = {
  isLoading: boolean
  isData: boolean
  setDirId: React.Dispatch<React.SetStateAction<number>>
}

const NodeList = ({ isLoading, isData, setDirId }: Props) => {
  const store = useStore();
  const navigate = useNavigate();

  const handleClickDir = useCallback((nodeId: number) => {
    navigate(`/finder/${nodeId}`);
    setDirId(nodeId);
  }, [navigate, setDirId]);

  const handleClickFile = useCallback((nodeId: number) => {
    navigate(`/viewer/${nodeId}`);
  }, [navigate]);

  if (!isLoading) return <>Loading...</>
  if (!isData) return <>No Data..</>
  
  return (<>
    {store.nodes.map((node) => (
      node.type === 'DIR' ?
        <div key={node.id} onClick={() => handleClickDir(node.id)}>[DIR]{node.name}</div> :
        <div key={node.id} onClick={() => handleClickFile(node.id)}>[FILE]{node.name}</div>
    ))}
  </>)
}

export default React.memo(NodeList);