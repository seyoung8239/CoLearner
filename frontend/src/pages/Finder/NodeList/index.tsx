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
  {id: 130, name: '2022S_OSP_11 (text analysis)', parent:0, type:'FILE'},
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
    <div className ="files">
    {nodes.map((node) => (
      node.type === 'DIR' ?
        <div className = "finderdir" key={node.id} onClick={() => handleClickDir(node.id)}>
          <img className = "fileicon" src ="https://cdn-icons-png.flaticon.com/512/716/716784.png"></img>
        <div className = "dirname">[DIR]{node.name}</div></div> :
        <div className = "finderfile"key={node.id} onClick={() => handleClickFile(node.id)}>
            <img className = "fileicon" src ="https://cdn-icons-png.flaticon.com/512/2306/2306145.png"></img>
        <div className = "filename">[FILE]{node.name}</div></div>
    ))}
 </div>
  </>)
}

//  <a href="https://www.flaticon.com/free-icons/folder" title="folder icons">Folder icons created by DinosoftLabs - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/pdf-document" title="pdf-document icons">Pdf-document icons created by iconixar - Flaticon</a>

export default React.memo(NodeList);