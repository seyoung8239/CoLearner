import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestFormPost } from '../../utils/api';
import styles from './SignUp.module.css';

const SignUp = () => {
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
      >(apiOrigin + '/signup', {}, formData);
      if (data.message === 'success') {
        alert('회원가입에 성공했습니다.')
        navigate('/signin');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    }
  }, [navigate, uid, pwd]);

  return <>
    <div className={styles.container}>
      <h1 className={styles.logo}>Colearner</h1>
      <h1 className={styles.title}>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input className={styles.idBox} type="text" placeholder="아이디를 입력해주세요" onChange={e => setUid(e.target.value as string)} />
        <input className={styles.pwBox} type="password" placeholder="비밀번호를 입력해주세요" onChange={e => setPwd(e.target.value as string)} />
        <button className={styles.button} type='submit'>회원가입</button>
      </form>
    </div>
  </>
}

export default SignUp;