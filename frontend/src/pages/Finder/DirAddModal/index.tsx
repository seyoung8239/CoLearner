import React, { useState, useCallback, useEffect } from 'react';
import { BasicAPIResponseType } from '../../../types';
import { apiOrigin, requestFormPost } from '../../../utils/api';


type Props = {
  dirId: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirAddModal = ({ dirId, isModalOpen, setIsModalOpen }: Props) => {
  const [newDirName, setNewDirName] = useState<string>("");

  const handleMakeDir = useCallback(async (e: any) => {
    // e.preventDefault();
    const formData = new FormData();
    if (newDirName) {
      // formData.append('id', dirId.toString());
      formData.append('dirname', newDirName);
      const {data} = await requestFormPost<
        BasicAPIResponseType<any>
      >(apiOrigin + '/makedir' + `/${dirId}`, {}, formData);
      console.log(data)
    }
  }, [newDirName])

  if (!isModalOpen)
    return <></>

  return <>
    <form onSubmit={handleMakeDir}>
      <div className = "diraddbar">
      <input className ="newdirname" type="text" placeholder='새 디렉터리 이름을 입력해주세요' onChange={e => setNewDirName(e.target.value as string)} />
      <button className = "diradd" type='submit'>생성</button>
      <button className = "close" onClick={e => { setIsModalOpen(false) }}>닫기</button>
      </div>
    </form>
  </>
}

export default DirAddModal;