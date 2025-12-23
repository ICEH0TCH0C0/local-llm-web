// src/components/Phone.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore, SCREEN } from '../store/phoneStore';

// 컴포넌트 & 아이콘
import PhoneOff from './PhoneOff';
import HomeScreen from './HomeScreen';
import EdgePanel from './EdgePanel';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { FaSignal, FaBatteryThreeQuarters, FaWifi, FaChevronLeft, FaBars } from 'react-icons/fa';
import { BiSquareRounded } from 'react-icons/bi';

const GalaxyPhone = () => {
  const { currentScreen, isPowerOn, togglePower, goBack, goToHome } = usePhoneStore();

  const renderContent = () => {
    if (!isPowerOn) return <PhoneOff />;
    switch (currentScreen) {
      case SCREEN.OFF: return <PhoneOff />;
      case SCREEN.HOME: return <HomeScreen />;
      case SCREEN.CHAT_LIST: return <ChatList />;
      case SCREEN.CHAT_ROOM: return <ChatRoom />;
      default: return <PhoneOff />;
    }
  };

  return (
    <S.PhoneFrame>
      <S.PunchHole />
      <S.SideButton $type="volume" />
      <S.SideButton $type="power" onClick={togglePower} />

      <S.ScreenContent>
        {isPowerOn && (
          <S.StatusBar>
            <span>12:45</span>
            <div style={{display:'flex', gap:'6px', alignItems: 'center'}}>
              <FaWifi />
              <FaSignal />
              <FaBatteryThreeQuarters />
            </div>
          </S.StatusBar>
        )}
        
        {/* ✅ [수정] 인라인 스타일 div 대신 ContentWrapper 사용 */}
        <S.ContentWrapper>
          {renderContent()}
        </S.ContentWrapper>
        
        {isPowerOn && <EdgePanel />}

        {isPowerOn && (
          <S.NavBar>
            <S.NavButton><FaBars /></S.NavButton> 
            <S.NavButton onClick={goToHome}>
              <BiSquareRounded size={24} />
            </S.NavButton>
            <S.NavButton onClick={goBack}><FaChevronLeft /></S.NavButton>
          </S.NavBar>
        )}
      </S.ScreenContent>
    </S.PhoneFrame>
  );
};

export default GalaxyPhone;