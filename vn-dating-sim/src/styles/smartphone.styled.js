// src/styles/smartphone.styled.js
import styled, { css, keyframes } from 'styled-components';

// --------------------------------------------------------
// 🖥️ 전체 레이아웃 (16:9 게임 화면)
// --------------------------------------------------------
export const LayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  /* ✅ [추가] 전체 화면 스크롤 원천 차단 */
  overflow: hidden; 
`;

export const GameContainer = styled.div`
  width: 100%;
  max-width: 1600px; /* 최대 크기 제한 */
  aspect-ratio: 16 / 9; /* 게임 화면 비율 고정 */
  background-color: #f5f6fa;
  position: relative;
  overflow: hidden; /* 폰이 아래로 숨겨질 때 잘리도록 설정 */
  box-shadow: 0 0 50px rgba(0,0,0,0.3);
`;

// --------------------------------------------------------
// 📱 스마트폰 프레임 (Galaxy S25+) - 비율 고정
// --------------------------------------------------------
export const PhoneWrapper = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%; /* 위치 고정 */
  
  /* ✅ 핵심: 높이는 게임 화면의 90%, 너비는 비율에 맞춰 자동 조절 */
  height: 90%; 
  aspect-ratio: 9 / 19.5; /* 갤럭시 S25+ 실제 비율 */
  width: auto;
  
  z-index: 1000;
  
  /* ✅ 슬라이드 애니메이션: 위치 이동(translate) 사용 */
  transform: translateY(${(props) => (props.$isVisible ? '0%' : '150%')});
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export const PhoneFrame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 8%; /* % 단위로 변경하여 크기에 맞게 둥글기 조절 */
  border: 3px solid #444;
  box-shadow: 
    0 0 0 2px #d1cdcf,
    15px 15px 40px rgba(0,0,0,0.4);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PunchHole = styled.div`
  position: absolute;
  top: 1.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 3%; /* 부모 크기 비례 */
  aspect-ratio: 1/1; /* 정원 유지 */
  background-color: #000;
  border-radius: 50%;
  z-index: 200;
`;

export const SideButton = styled.div`
  position: absolute;
  right: -2%; /* 프레임 두께 고려 */
  width: 1.5%;
  background-color: #b0b0b0;
  border-radius: 2px;
  
  ${(props) => props.$type === 'volume' && css`
    height: 8%;
    top: 15%;
  `}

  ${(props) => props.$type === 'power' && css`
    height: 5%;
    top: 25%;
    cursor: pointer;
    &:active { transform: translateX(-10%); }
  `}
`;

// --------------------------------------------------------
// 🏠 화면 내부 & 앱 아이콘
// --------------------------------------------------------
export const ScreenContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 7%; /* 프레임에 맞춰 둥글기 조절 */
  overflow: hidden;
  position: relative;
`;

export const StatusBar = styled.div`
  height: 5%; /* 퍼센트 단위 */
  padding: 0 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(10px, 1.5cqh, 14px); /* 컨테이너 쿼리 활용 폰트 크기 */
  font-weight: 600;
  color: #333;
`;

// 앱 그리드: 3열 배치
export const AppGrid = styled.div`
  padding: 10% 6%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5%;
  align-content: start;
`;

export const AppItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &:active { opacity: 0.7; transform: scale(0.95); }
`;

export const AppIcon = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 22%;
  background-color: ${(props) => props.$color || '#eee'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(20px, 4cqw, 30px);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  
  /* ✅ [수정] 배지 위치 기준점 */
  position: relative; 
`;

// ✅ [추가] 앱 아이콘 전용 배지
export const AppBadge = styled.div`
  position: absolute;
  top: -5%;
  right: -5%;
  width: 35%;
  height: 35%;
  background-color: #ff3b30;
  color: white;
  border-radius: 50%;
  font-size: clamp(10px, 2cqw, 12px);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 10;
`;

export const AppName = styled.span`
  font-size: clamp(10px, 2cqw, 12px);
  color: #333;
  text-align: center;
  letter-spacing: -0.5px;
`;

// --------------------------------------------------------
// 🧭 네비게이션 바
// --------------------------------------------------------
export const NavBar = styled.div`
  height: 7%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  flex-shrink: 0;
  z-index: 100;
`;

export const NavButton = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(16px, 3cqw, 20px);
  color: #555;
  cursor: pointer;
  
  &:active { background-color: #f0f0f0; }
`;

// --------------------------------------------------------
// 🧊 엣지 패널
// --------------------------------------------------------
export const EdgePanelContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22%; /* 폰 너비의 22% */
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  z-index: 900;
  
  transform: translateX(${(props) => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25%;
  gap: 15px;
`;

export const EdgeHandle = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 2%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.2);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  z-index: 950;
  opacity: ${(props) => (props.$isOpen ? '0' : '1')};
  transition: opacity 0.2s;
`;

export const EdgeAppIcon = styled.div`
  width: 60%;
  aspect-ratio: 1/1;
  border-radius: 30%;
  background-color: ${(props) => props.$color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(14px, 3cqw, 20px);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  &:active { transform: scale(0.9); }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 800;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s;
`;

// --------------------------------------------------------
// 🔔 알림 아이콘
// --------------------------------------------------------
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

export const PhoneTrigger = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 60px; /* 고정 크기 추천 (비율보다 클릭하기 편함) */
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  z-index: 500;
  
  /* ✅ 알림이 있을 때만 애니메이션 작동 */
  animation: ${(props) => (props.$hasNotification ? css`${bounce} 1s infinite` : 'none')};
  
  /* 호버 효과 */
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
`;

// --------------------------------------------------------
// 💬 채팅 앱 (목록 & 방) 스타일
// --------------------------------------------------------

export const ChatHeader = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  flex-shrink: 0;
`;

export const ChatTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  background-color: #fff;
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
  &:active {
    background-color: #f0f0f0;
  }
`;

export const ProfileImg = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 18px; /* One UI 스타일 */
  background-color: ${(props) => props.$bg || '#ddd'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 15px;
  flex-shrink: 0;
`;

export const ChatInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

export const ChatName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

export const LastMessage = styled.span`
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  font-size: 11px;
  color: #bbb;
  min-width: 40px;
`;

export const UnreadBadge = styled.div`
  background-color: #ff4757;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
`;

export const MessageContainer = styled.div`
  flex: 1;
  background-color: #b2c7d9; /* 카카오톡 기본 배경색 */
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  /* 스크롤바 숨김 (깔끔하게) */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 4px; }
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
`;

export const AvatarSmall = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background-color: #ffb6b9; /* 루나 색상 */
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

export const Bubble = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  word-break: break-word;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);

  /* 내 말풍선 (노랑) vs 상대방 (흰색) */
  background-color: ${(props) => (props.$isMe ? '#ffeb33' : '#ffffff')};
  color: #333;
  
  /* 말풍선 꼬리 효과 */
  ${(props) => props.$isMe 
    ? css`border-top-right-radius: 2px;` 
    : css`border-top-left-radius: 2px;`
  }
`;

export const InputBar = styled.div`
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #eee;
  flex-shrink: 0; /* 크기 고정 */
`;

export const ChatInput = styled.input`
  flex: 1;
  height: 36px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 18px;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  
  &:focus { background-color: #e5e5e5; }
`;

export const SendButton = styled.button`
  background: none;
  border: none;
  background-color: #ffeb33;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 8px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.1s;

  &:active { transform: scale(0.9); }
  &:disabled { background-color: #eee; color: #aaa; }
`;