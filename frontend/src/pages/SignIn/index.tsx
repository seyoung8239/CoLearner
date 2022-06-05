import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestFormPost } from '../../utils/api';
import styles from './SignIn.module.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>();
  const [pwd, setPwd] = useState<string>();

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault(); 
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
        navigate('/finder/0');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  }, [navigate, uid, pwd]);

  return (<>
    <h1 className={styles.logo}>Colearner</h1>
      <div className={styles.container}>
        <h2 className={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input className={styles.idBox} type="text" placeholder="아이디를 입력해주세요" onChange={e => setUid(e.target.value as string)} />
          <input className={styles.pwBox} type="password" placeholder="비밀번호를 입력해주세요" onChange={e => setPwd(e.target.value as string)} />
          <button className={styles.button} type='submit'>로그인</button>
        </form>
      </div>
  </>);
}

export default SignIn;