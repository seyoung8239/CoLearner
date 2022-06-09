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
  if (!isData) 
    return <div
      style={{
        'position': 'relative',
        'left': '30px',
        'fontSize': '1.6em'
      }}>파일을 추가해 주세요</div>

  return (<>
    <div className="files">
      {store.nodes.map((node) => (
        node.type === 'DIR' ?
          <div className="finderdir" key={node.id} onClick={() => handleClickDir(node.id)}>
            <img className="fileicon" src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt=""></img>
            <div className="dirname">[DIR]{node.name}</div></div> :
          <div className="finderfile" key={node.id} onClick={() => handleClickFile(node.id)}>
            <img className="fileicon" src="https://cdn-icons-png.flaticon.com/512/2306/2306145.png" alt=""></img>
            <div className="filename">[FILE]{node.name}</div></div>
      ))}
    </div>
  </>)
}

// <a href="https://www.flaticon.com/free-icons/folder" title="folder icons">Folder icons created by DinosoftLabs - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/pdf-document" title="pdf-document icons">Pdf-document icons created by iconixar - Flaticon</a>

export default React.memo(NodeList);