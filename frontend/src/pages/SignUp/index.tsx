import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(() => {
    navigate('/main');
  }, [navigate]);
  return <>
    <h1>회원가입</h1>
    <form action="">
      <input type="text" />
      <input type="text" />
      <button type='submit' onClick={handleSubmit}>회원가입</button>
    </form></>
}

export default SignUp;