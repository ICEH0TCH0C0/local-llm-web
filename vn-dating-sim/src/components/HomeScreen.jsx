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
  const { launchApp, currentTime } = usePhoneStore();
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
    const SWIPE_THRESHOLD = 30; // 50px 이상 움직여야 인식

    if (diff > SWIPE_THRESHOLD && !isDrawerOpen) {
      // 위로 쓸어올림 -> 열기
      setIsDrawerOpen(true);
    } else if (diff < -SWIPE_THRESHOLD && isDrawerOpen) {
      // 아래로 쓸어내림 -> 닫기
      setIsDrawerOpen(false);
    }

    setDragStartY(null); // 초기화
  };

  //시간 포멧
  const timeStr = currentTime.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });

  //날짜 포멧
  const dateStr = currentTime.toLocaleDateString('ko-KR', { 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  });

  return (
    <S.HomeContainer
      onMouseDown={(e) => handleDragStart(e.clientY)}
      onMouseUp={(e) => handleDragEnd(e.clientY)}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientY)}
    >
      <S.HomeHeader>
        <S.HomeClock>{timeStr}</S.HomeClock>
        <S.HomeDate>{dateStr}</S.HomeDate>
      </S.HomeHeader>

      {/* ✅ 클릭해도 열리도록 onClick 추가 */}
      <S.SwipeArea onClick={() => setIsDrawerOpen(true)}>
        <FaChevronUp />
        <span>위로 스와이프</span>
      </S.SwipeArea>

      <S.AppDrawer $isOpen={isDrawerOpen}>
        {/* ✅ 드로어 핸들도 클릭하면 닫히도록 유지 */}
        <S.DrawerHandle onClick={(e) => {
          e.stopPropagation();
          setIsDrawerOpen(false);
        }} />

        <S.AppGrid>
          {APPS.map((app) => (
            <S.AppItem key={app.id} onClick={(e) => {
              e.stopPropagation(); // 드로어 닫힘 방지
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