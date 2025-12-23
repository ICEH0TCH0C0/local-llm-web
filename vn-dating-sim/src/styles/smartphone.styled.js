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
  overflow: hidden;
`;

export const GameContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  aspect-ratio: 16 / 9;
  background-color: #f5f6fa;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(0,0,0,0.3);
`;

// --------------------------------------------------------
// 📱 스마트폰 프레임 (Galaxy S25+ 비율 19.5:9 고정)
// --------------------------------------------------------
export const PhoneWrapper = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
  height: 90%;
  aspect-ratio: 9 / 19.5;
  z-index: 1000;
  transform: translateY(${(props) => (props.$isVisible ? '0%' : '150%')});
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
  display: flex;
  flex-direction: column;
`;

export const PhoneFrame = styled.div`
  /* 🌟 핵심 해결책: 절대 위치로 띄워서 부모 크기에 강제로 맞춤 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 둥근 모서리 밖으로 내용이 튀어나가는 것 방지 (내부 컨텐츠 클리핑) */
  overflow: hidden; 
  
  background-color: #000;
  border-radius: 2.5rem;
  border: 3px solid #444;
  
  box-shadow: 0 0 0 2px #d1cdcf, 15px 15px 40px rgba(0,0,0,0.4);
    
  display: flex;
  flex-direction: column;
  
  /* 내부 플렉스 아이템들이 너비를 무시하는 것 방지 */
  min-width: 0;
`;

export const PunchHole = styled.div`
  position: absolute;
  top: 1.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 3%;
  aspect-ratio: 1/1;
  background-color: #000;
  border-radius: 50%;
  z-index: 200;
`;

export const SideButton = styled.div`
  position: absolute;
  right: -2px;
  width: 3px;
  background-color: #b0b0b0;
  border-radius: 2px;
  ${(props) => props.$type === 'volume' && css`height: 8%; top: 15%;`}
  ${(props) => props.$type === 'power' && css`height: 5%; top: 25%; cursor: pointer; &:active { transform: translateX(-1px); }`}
`;

// --------------------------------------------------------
// 🏠 화면 내부 & 앱 아이콘
// --------------------------------------------------------
export const ScreenContent = styled.div`
  flex: 1; /* ✅ 부모의 남은 높이를 꽉 채움 */
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 2.2rem;
  overflow: hidden;
  position: relative;
  min-height: 0;
`;

// ✅ [필수] 내부 콘텐츠 래퍼 (이게 없으면 앱 켰을 때 멈춤)
export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const StatusBar = styled.div`
  height: 5%;
  padding: 0 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(10px, 1.5vh, 14px);
  font-weight: 600;
  color: #333;
`;

export const AppGrid = styled.div`
  padding: 15% 8%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
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
  font-size: clamp(20px, 3vh, 32px);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  position: relative;
`;

export const AppBadge = styled.div`
  position: absolute;
  top: -5%; right: -5%;
  width: 35%; height: 35%;
  background-color: #ff3b30;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  display: flex; justify-content: center; align-items: center;
  border: 2px solid #fff;
  z-index: 10;
`;

export const AppName = styled.span`
  font-size: clamp(10px, 1.2vh, 12px);
  color: #333;
  text-align: center;
  letter-spacing: -0.5px;
  margin-top: 5px;
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
  font-size: clamp(16px, 2.5vh, 24px);
  color: #555;
  cursor: pointer;
  &:active { background-color: #f0f0f0; }
`;

// --------------------------------------------------------
// 🧊 엣지 패널
// --------------------------------------------------------
export const EdgePanelContainer = styled.div`
  position: absolute;
  top: 0; right: 0;
  width: 22%; height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  z-index: 900;
  transform: translateX(${(props) => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30%;
  gap: 20px;
`;

export const EdgeHandle = styled.div`
  position: absolute;
  top: 50%; right: 0;
  transform: translateY(-50%);
  width: 4px; height: 10%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px 0 0 4px;
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
  font-size: 20px;
  color: white;
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
// 🔔 알림 트리거 (외부)
// --------------------------------------------------------
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const PhoneTrigger = styled.div`
  position: absolute;
  bottom: 5%; right: 5%;
  width: 60px; height: 60px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  z-index: 500;
  animation: ${(props) => (props.$hasNotification ? css`${bounce} 1s infinite` : 'none')};
  &:hover { transform: scale(1.1); transition: transform 0.2s; }
`;

export const Badge = styled.div`
  position: absolute;
  top: 0; right: 0;
  width: 20px; height: 20px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: bold;
  display: flex; justify-content: center; align-items: center;
  border: 2px solid #fff;
`;

// --------------------------------------------------------
// 💬 채팅 목록 스타일 (여기부터가 핵심)
// --------------------------------------------------------

export const ChatHeader = styled.div`
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  flex-shrink: 0;
`;

export const ChatTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  padding: 10px 0;
  background-color: #fff;
  width: 100%;
  max-width: 100%;
  min-height: 0; /* Flexbox 스크롤 필수 */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.2); border-radius: 4px; }
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transition: background-color 0.2s;
  &:hover { background-color: #f9f9f9; }
`;

export const ProfileImg = styled.div`
  width: 36px; height: 36px;
  border-radius: 14px;
  background-color: ${(props) => props.$bg || '#ddd'};
  display: flex; justify-content: center; align-items: center;
  font-size: 24px;
  margin-right: 15px;
  flex-shrink: 0;
`;

export const ChatInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-direction: column;
  min-width: 0;
`;

export const ChatName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const LastMessage = styled.span`
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 활성화 */
  width: 100%;
  display: block;
`;

export const ChatMeta = styled.div`
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 5px; font-size: 11px; color: #bbb; min-width: 40px;
`;

export const UnreadBadge = styled.div`
  background-color: #ff4757; color: white;
  border-radius: 10px; padding: 2px 6px;
  font-size: 10px; font-weight: bold;
`;

// --------------------------------------------------------
// 🗣️ 채팅방 상세 스타일
// --------------------------------------------------------
export const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  background-color: #b2c7d9;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  scroll-behavior: smooth;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 4px; }
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
`;

export const AvatarSmall = styled.div`
  width: 32px; height: 32px;
  border-radius: 12px;
  background-color: #ffb6b9;
  margin-right: 8px;
  display: flex; justify-content: center; align-items: center;
  font-size: 18px;
`;

export const Bubble = styled.div`
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word; /* 텍스트 줄바꿈 */
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  background-color: ${(props) => (props.$isMe ? '#ffeb33' : '#ffffff')};
  color: #333;
  ${(props) => props.$isMe ? css`border-top-right-radius: 2px;` : css`border-top-left-radius: 2px;`}
`;

export const InputBar = styled.div`
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #eee;
  flex-shrink: 0;
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
  background: #ffeb33;
  border: none;
  width: 32px; height: 32px;
  border-radius: 50%;
  margin-left: 8px;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
  transition: transform 0.1s;
  &:active { transform: scale(0.9); }
  &:disabled { background-color: #eee; color: #aaa; }
`;

// --------------------------------------------------------
// 🏠 홈 화면 (런처) 스타일
// --------------------------------------------------------

// 1. 홈 화면 전체 컨테이너
export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%);
  
  /* ✅ 드래그 시 텍스트 선택 방지 & 터치 동작 최적화 */
  user-select: none;
  touch-action: none; 
  cursor: grab; /* 마우스 커서를 손 모양으로 */
  
  &:active {
    cursor: grabbing; /* 드래그 중일 때 쥐는 모양 */
  }
`;

// 2. 상단 시계/날짜 위젯
export const HomeHeader = styled.div`
  padding-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  text-shadow: 0 1px 2px rgba(255,255,255,0.5);
`;

export const HomeClock = styled.h1`
  font-size: 48px;
  font-weight: 300;
  margin: 0;
  letter-spacing: -2px;
  color: #2d3436;
`;

export const HomeDate = styled.p`
  font-size: 16px;
  margin: 5px 0 0 0;
  font-weight: 500;
  color: #636e72;
`;

// 3. 위로 스크롤 유도 화살표 (바닥)
const bounceUp = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-5px); opacity: 1; }
`;

export const SwipeArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  z-index: 10;
  color: #555;
  font-size: 12px;
  background: linear-gradient(to top, rgba(255,255,255,0.3), transparent);
  
  span {
    margin-bottom: 5px;
    font-size: 20px;
    animation: ${bounceUp} 2s infinite;
  }
`;

// 4. 앱 보관함 (앱 드로어) - 평소엔 아래에 숨어있음
export const AppDrawer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 유리 같은 반투명 배경 효과 */
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(15px);
  
  z-index: 20;
  
  /* 🌟 핵심: isOpen 상태에 따라 위치 이동 (0% = 보임, 100% = 숨음) */
  transform: translateY(${(props) => (props.$isOpen ? '0%' : '100%')});
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); /* 부드러운 감속 */
  
  display: flex;
  flex-direction: column;
`;

// 5. 드로어 닫기 핸들 (상단)
export const DrawerHandle = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0; /* 크기 줄어듦 방지 */
  
  /* 작은 막대기 모양 */
  &::after {
    content: '';
    width: 40px;
    height: 5px;
    background-color: #ccc;
    border-radius: 3px;
  }
`;