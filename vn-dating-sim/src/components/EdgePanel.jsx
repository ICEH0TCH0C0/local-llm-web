import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';

const EDGE_APPS = [
  { id: 'messenger', icon: '💬', color: '#ffeaa7' },
  { id: 'map',       icon: '🗺️', color: '#55efc4' },
  { id: 'gallery',   icon: '🖼️', color: '#ff7675' },
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
        <div style={{ marginTop: 'auto', marginBottom: '20px', opacity: 0.5 }}>⚙️</div>
      </S.EdgePanelContainer>
    </>
  );
};
export default EdgePanel;