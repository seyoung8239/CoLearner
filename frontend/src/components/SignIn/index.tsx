import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  return (<>
    <h1>로그인</h1>
    <form action="">
      <input type="text" />
      <input type="text" />
      <button type='submit' onClick={handleSubmit}>로그인</button>
    </form>
  </>);
}

export default SignIn;