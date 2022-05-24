import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestFormPost } from '../../utils/api';

const SignIn = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>();
  const [pwd, setPwd] = useState<string>();

  const handleSubmit = useCallback(async (e: any) => {
    const formData = new FormData();
    if (uid && pwd) {
      formData.append('uid', uid);
      formData.append('pwd', pwd);
      const { data } = await requestFormPost<
        BasicAPIResponseType<{ message: string }>
      >(apiOrigin + '/signin', {}, formData);
      console.log(data)
      if (data.message === 'success') {
        alert('로그인에 성공했습니다.')
        navigate('/home');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  }, [navigate, uid, pwd]);

  return (<>
    <h1>로그인</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setUid(e.target.value as string)} />
      <input type="password" onChange={e => setPwd(e.target.value as string)} />
      <button type='submit'>로그인</button>
    </form>
  </>);
}

export default SignIn;