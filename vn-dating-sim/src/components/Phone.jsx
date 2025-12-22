// src/components/Phone.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore, SCREEN } from '../store/phoneStore';

// 하위 컴포넌트들
import PhoneOff from './PhoneOff';
import HomeScreen from './HomeScreen';
import EdgePanel from './EdgePanel';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom'; // ✅ [추가] 채팅방 컴포넌트

const GalaxyPhone = () => {
  const { currentScreen, isPowerOn, togglePower, goBack, goToHome } = usePhoneStore();

  const renderContent = () => {
    if (!isPowerOn) return <PhoneOff />;

    switch (currentScreen) {
      case SCREEN.OFF: 
        return <PhoneOff />;
      case SCREEN.HOME: 
        return <HomeScreen />;
      case SCREEN.CHAT_LIST: 
        return <ChatList />;
      case SCREEN.CHAT_ROOM: 
        return <ChatRoom />; // ✅ [연결] 실제 채팅방 렌더링
      default: 
        return <PhoneOff />;
    }
  };

  return (
    <S.PhoneFrame>
      {/* ... (기존 상단바, 버튼 코드 유지) ... */}
      <S.PunchHole />
      <S.SideButton $type="volume" />
      <S.SideButton $type="power" onClick={togglePower} />

      <S.ScreenContent>
        {isPowerOn && (
          <S.StatusBar>
            <span>12:45</span>
            <div style={{display:'flex', gap:'6px'}}>
              <span>5G</span>
              <span>88%</span>
            </div>
          </S.StatusBar>
        )}
        
        {/* flex:1을 주어 남은 공간을 채팅방이 꽉 채우게 함 */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderContent()}
        </div>
        
        {isPowerOn && <EdgePanel />}

        {isPowerOn && (
          <S.NavBar>
            <S.NavButton>|||</S.NavButton> 
            <S.NavButton onClick={goToHome}>
              <span style={{ border: '2px solid #555', borderRadius: '6px', width: '16px', height: '16px' }}></span>
            </S.NavButton>
            <S.NavButton onClick={goBack}>❮</S.NavButton>
          </S.NavBar>
        )}
      </S.ScreenContent>
    </S.PhoneFrame>
  );
};

export default GalaxyPhone;