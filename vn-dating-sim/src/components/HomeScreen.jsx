// src/components/HomeScreen.jsx
import React, { useState } from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';
import { FaCommentDots, FaImages, FaMapMarkedAlt, FaCalendarAlt, FaClock, FaCog, FaChevronUp, FaSearch } from 'react-icons/fa';
import { CHAT_ROOM_DATA } from './ChatList';

export const APPS = [
  { id: 'messenger', name: 'Talk', icon: <FaCommentDots />, color: '#ffeaa7' },
  { id: 'gallery',   name: '갤러리',   icon: <FaImages />,      color: '#ff7675' },
  { id: 'map',       name: '지도',     icon: <FaMapMarkedAlt />, color: '#55efc4' },
  { id: 'calendar',  name: '캘린더',   icon: <FaCalendarAlt />,  color: '#74b9ff' },
  { id: 'clock',     name: '시계',     icon: <FaClock />,        color: '#a29bfe' },
  { id: 'settings',  name: '설정',     icon: <FaCog />,          color: '#b2bec3' },
];

const HomeScreen = () => {
  const { launchApp } = usePhoneStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // 드래그 시작 위치 저장
  const [dragStartY, setDragStartY] = useState(null);

  const totalUnread = CHAT_ROOM_DATA.reduce((sum, room) => sum + (room.unread || 0), 0);

  // 🖱️ 마우스/터치 시작 (누름)
  const handleDragStart = (clientY) => {
    setDragStartY(clientY);
  };

  // 👋 마우스/터치 종료 (뗌) -> 이동 거리 계산
  const handleDragEnd = (clientY) => {
    if (dragStartY === null) return;

    const diff = dragStartY - clientY; // 양수면 위로 드래그, 음수면 아래로 드래그
    const SWIPE_THRESHOLD = 50; // 50px 이상 움직여야 인식

    if (diff > SWIPE_THRESHOLD && !isDrawerOpen) {
      // 위로 쓸어올림 -> 열기
      setIsDrawerOpen(true);
    } else if (diff < -SWIPE_THRESHOLD && isDrawerOpen) {
      // 아래로 쓸어내림 -> 닫기
      setIsDrawerOpen(false);
    }

    setDragStartY(null); // 초기화
  };

  return (
    <S.HomeContainer
      // ✅ 마우스 이벤트 (PC)
      onMouseDown={(e) => handleDragStart(e.clientY)}
      onMouseUp={(e) => handleDragEnd(e.clientY)}
      // ✅ 터치 이벤트 (모바일)
      onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientY)}
    >
      
      {/* 1. 메인 홈 화면 (배경 + 시계) */}
      <S.HomeHeader>
        <S.HomeClock>12:45</S.HomeClock>
        <S.HomeDate>10월 24일 화요일</S.HomeDate>
      </S.HomeHeader>

      {/* 3. 위로 스크롤 유도 (화살표) */}
      {/* 클릭해도 열리게 유지하되, 드래그 힌트 역할 수행 */}
      <S.SwipeArea>
        <FaChevronUp />
        <span>위로 스와이프</span>
      </S.SwipeArea>


      {/* 4. 앱 보관함 (앱 드로어) */}
      {/* 드로어 내부에서도 드래그 이벤트를 상속받아, 아래로 내리면 닫히게 동작함 */}
      <S.AppDrawer $isOpen={isDrawerOpen}>
        <S.DrawerHandle onClick={() => setIsDrawerOpen(false)} />

        <S.AppGrid>
          {APPS.map((app) => (
            <S.AppItem key={app.id} onClick={(e) => {
              // 드래그 중 클릭 방지 (살짝 움직인 건 클릭으로 인정)
              e.stopPropagation(); 
              launchApp(app.id);
            }}>
              <S.AppIcon $color={app.color}>
                {app.icon}
                {app.id === 'messenger' && totalUnread > 0 && (
                  <S.AppBadge>{totalUnread}</S.AppBadge>
                )}
              </S.AppIcon>
              <S.AppName>{app.name}</S.AppName>
            </S.AppItem>
          ))}
        </S.AppGrid>
      </S.AppDrawer>

    </S.HomeContainer>
  );
};

export default HomeScreen;