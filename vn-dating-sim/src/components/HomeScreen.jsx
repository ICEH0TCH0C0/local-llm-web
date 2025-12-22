// src/components/HomeScreen.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';

export const APPS = [
  { id: 'messenger', name: 'LoveTalk', icon: '💬', color: '#ffeaa7' },
  { id: 'gallery',   name: '갤러리',   icon: '🖼️', color: '#ff7675' },
  { id: 'map',       name: '지도',     icon: '🗺️', color: '#55efc4' },
  { id: 'calendar',  name: '캘린더',   icon: '📅', color: '#74b9ff' },
  { id: 'clock',     name: '시계',     icon: '⏰', color: '#a29bfe' },
  { id: 'settings',  name: '설정',     icon: '⚙️', color: '#b2bec3' },
];

const HomeScreen = () => {
  const { launchApp, notification } = usePhoneStore(); // ✅ notification 가져오기

  return (
    <S.AppGrid>
      {APPS.map((app) => (
        <S.AppItem key={app.id} onClick={() => launchApp(app.id)}>
          <S.AppIcon $color={app.color}>
            {app.icon}
            
            {/* ✅ 조건부 렌더링: 메신저 앱이고 + 알림이 있으면 -> 배지 표시 */}
            {app.id === 'messenger' && notification && (
              <S.AppBadge>1</S.AppBadge>
            )}
          </S.AppIcon>
          <S.AppName>{app.name}</S.AppName>
        </S.AppItem>
      ))}
    </S.AppGrid>
  );
};

export default HomeScreen;