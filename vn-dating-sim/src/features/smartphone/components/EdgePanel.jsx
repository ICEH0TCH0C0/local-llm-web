// src/components/EdgePanel.jsx
import React from 'react';
import * as S from '../../../styles/smartphone.styled';
import { usePhoneStore } from '../../../store/phoneStore';
import { FaCog } from 'react-icons/fa';
import { APPS } from '../data/apps';

const FAVORITE_IDS = ['messenger', 'map', 'gallery'];
const EDGE_APPS = APPS.filter(app => FAVORITE_IDS.includes(app.id));

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