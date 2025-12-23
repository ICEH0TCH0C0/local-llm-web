// src/components/EdgePanel.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';
import { FaCommentDots, FaImages, FaMapMarkedAlt, FaCog } from 'react-icons/fa';

const EDGE_APPS = [
  { id: 'messenger', icon: <FaCommentDots />, color: '#ffeaa7' },
  { id: 'map',       icon: <FaMapMarkedAlt />, color: '#55efc4' },
  { id: 'gallery',   icon: <FaImages />,      color: '#ff7675' },
];

const EdgePanel = () => {
  const { isEdgePanelOpen, toggleEdgePanel, closeEdgePanel, launchApp } = usePhoneStore();

  return (
    <>
      <S.Overlay $isOpen={isEdgePanelOpen} onClick={closeEdgePanel} />
      <S.EdgeHandle $isOpen={isEdgePanelOpen} onClick={toggleEdgePanel} />
      <S.EdgePanelContainer $isOpen={isEdgePanelOpen}>
        {EDGE_APPS.map((app) => (
          <S.EdgeAppIcon key={app.id} $color={app.color} onClick={() => launchApp(app.id)}>
            {app.icon}
          </S.EdgeAppIcon>
        ))}
        {/* 설정 아이콘 */}
        <div style={{ marginTop: 'auto', marginBottom: '20px', opacity: 0.5, fontSize: '24px' }}>
            <FaCog />
        </div>
      </S.EdgePanelContainer>
    </>
  );
};
export default EdgePanel;