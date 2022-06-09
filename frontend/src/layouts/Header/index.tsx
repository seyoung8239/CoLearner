/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import { BasicAPIResponseType } from '../../types';
import { apiOrigin, requestGet } from '../../utils/api';

import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const store = useStore();

  const handleLogout = useCallback(async () => {
    const res = await requestGet<
      BasicAPIResponseType<{ message: string }>
    >(apiOrigin + '/logout', {});
    if (res.data.message === 'success') {
      alert('로그아웃 했습니다.')
      store.logout();
      navigate('/');
    } else {
      alert('로그인 정보가 없습니다.')
    }
  }, [navigate, store]);

  const handleClickMain = useCallback(() => {
    if (store.isLogin)
      navigate('finder/0');
    else
      navigate('/');
  }, [navigate]);

  return <div id='header'>
    <h1 id='title' onClick={handleClickMain}>Colearner</h1>
    {
      store.isLogin &&
      <div id='msg_welcome'>
        <div id='hello'>안녕하세요, {store.name}님</div>
        <button id='btn_logout' onClick={handleLogout}>Logout</button>
      </div>

    }

  </div>
}

export default Header;