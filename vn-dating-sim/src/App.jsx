// src/App.jsx
import React, { useEffect } from 'react';
import * as S from './styles/smartphone.styled';
import { usePhoneStore } from './store/phoneStore';
import GalaxyPhone from './components/Phone'; 

function App() {
  const { 
    isPhoneVisible, notification, receiveNotification, openPhone 
  } = usePhoneStore();

  // 테스트: 3초 후 알림 도착
  useEffect(() => {
    const timer = setTimeout(() => {
      receiveNotification('루나', '선배, 뭐해요?');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.LayoutWrapper>
      <S.GameContainer>
        {/* 메인 게임 배경 */}
        <div style={{ padding: '50px' }}>
          <h1>메인 화면</h1>
          <p>우측 하단 아이콘을 눌러 언제든 폰을 확인할 수 있습니다.</p>
          <p>{notification ? "📩 메시지가 도착했습니다! (아이콘이 움직입니다)" : "알림 대기 중..."}</p>
        </div>

        {/* 휴대폰 트리거 아이콘 (항상 표시, 폰 열리면 숨김) */}
        {!isPhoneVisible && (
          <S.PhoneTrigger 
            onClick={openPhone} 
            $hasNotification={!!notification} // 알림 있으면 true -> 애니메이션 ON
          >
            📱
            {/* 알림 있을 때만 뱃지 표시 */}
            {notification && <S.Badge>N</S.Badge>}
          </S.PhoneTrigger>
        )}

        {/* 스마트폰 (슬라이드 애니메이션 래퍼) */}
        <S.PhoneWrapper $isVisible={isPhoneVisible}>
          <GalaxyPhone />
        </S.PhoneWrapper>

      </S.GameContainer>
    </S.LayoutWrapper>
  );
}

export default App;