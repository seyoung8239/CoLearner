import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/store';

type Props = {
  isLoading: boolean
  isData: boolean
  setDirId: React.Dispatch<React.SetStateAction<number>>
}

const nodes = [
  {id: 123, name: '폴더1', parent:0, type:'DIR'},
  {id: 124, name: '폴더2', parent:0, type:'DIR'},
  {id: 125, name: '오픈소스프로그래밍', parent:0, type:'DIR'},
  {id: 126, name: '데이터분석 기초와 활용 팀 프로젝트 보고서[3팀]', parent:0, type:'FILE'},
  {id: 127, name: '2022S_OSP_11 (text analysis)', parent:0, type:'FILE'},
  {id: 128, name: '2022S_OSP_11 (text analysis)', parent:0, type:'FILE'},
  {id: 129, name: '2022S_OSP_11 (text analysis)', parent:0, type:'FILE'},
]

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

  // if (!isLoading) return <>Loading...</>
  // if (!isData) return <>No Data..</>
  
  return (<>
    {nodes.map((node) => (
      node.type === 'DIR' ?
        <div key={node.id} onClick={() => handleClickDir(node.id)}>[DIR]{node.name}</div> :
        <div key={node.id} onClick={() => handleClickFile(node.id)}>[FILE]{node.name}</div>
    ))}
  </>)
}

export default React.memo(NodeList);