import React, { useCallback } from 'react';
import {useNavigate} from 'react-router-dom';

type PageCategory = "signin" | "signup" | "guest";

const Landing = () => {
  const navigate = useNavigate();
  
  const handleClick = useCallback((name: PageCategory) => {
    console.log(name);
    switch (name) {
      case "signin":
        navigate('/signin');
        break;
      case "signup":
        navigate('/signup');
        break;
      case "guest":
        navigate('/guest');
        break;
    }
  }, [navigate]);

  return (
    <>
      <button onClick={()=> handleClick("signin")}>로그인하기</button>
      <button onClick={()=> handleClick("signup")}>회원가입 하기</button>
      <button onClick={()=> handleClick("guest")}>비회원으로 사용하기</button>
    </>
  )
}

export default Landing;