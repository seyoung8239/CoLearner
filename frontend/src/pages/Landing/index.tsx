import React, { useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import "./landing.css";

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
    <h1>Colearner</h1>
      <button className = "signin"  onClick={()=> handleClick("signin")}>로그인하기</button>
      <button  className = "signup" onClick={()=> handleClick("signup")}>회원가입 하기</button>
      <button className = "guest"  onClick={()=> handleClick("guest")}>비회원으로 사용하기</button>
    </>
  )
}


export default Landing;