import { create } from 'zustand';
import { CHAT_ROOM_DATA } from '../features/smartphone/apps/messenger/data';

export const SCREEN = {
  OFF: 'OFF',
  HOME: 'HOME',
  CHAT_LIST: 'CHAT_LIST',
  CHAT_ROOM: 'CHAT_ROOM',
};

export const usePhoneStore = create((set, get) => ({
  // 상태
  isPowerOn: true,
  currentScreen: SCREEN.HOME,
  activeApp: null,
  selectedChatId: null, // 선택된 채팅방 ID 추가
  isPhoneVisible: false,
  isEdgePanelOpen: false,
  notification: null,
  currentTime: new Date(),
  chats: CHAT_ROOM_DATA, // 초기 데이터 설정

  // 시간 업데이트 액션 추가
  updateTime: () => set({ currentTime: new Date() }),

  // 메시지 추가
  addMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map(chat =>
      chat.id === chatId
        ? {
          ...chat,
          messages: [...chat.messages, {
            ...message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
          }],
          lastMessage: message.text,
          time: '방금',
          unread: state.currentScreen === SCREEN.CHAT_ROOM && state.selectedChatId === chatId ? 0 : chat.unread
        }
        : chat
    )
  })),

  // 액션
  togglePower: () => set((state) => ({
    isPowerOn: !state.isPowerOn,
    currentScreen: !state.isPowerOn ? SCREEN.HOME : SCREEN.OFF
  })),

  setPhoneVisible: (isVisible) => set({ isPhoneVisible: isVisible }),

  openPhone: () => set({
    isPhoneVisible: true,
    notification: null
  }),

  // ✅ [수정] 앱 실행 로직 분기 처리
  launchApp: (appName) => {
    // 엣지 패널 닫기
    set({ isEdgePanelOpen: false });

    if (appName === 'messenger') {
      // 메신저 앱 -> 채팅 목록 화면으로
      set({
        currentScreen: SCREEN.CHAT_LIST,
        activeApp: appName
      });
    } else {
      // 그 외 앱 -> 일단 홈 화면 유지 (추후 구현)
      console.log(`${appName} 앱은 아직 구현되지 않았습니다.`);
    }
  },

  // ✅ [수정] 채팅방 입장하기 (읽음 처리 추가)
  enterChatRoom: (chatId) => {
    set((state) => ({
      currentScreen: SCREEN.CHAT_ROOM,
      selectedChatId: chatId,
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    }));
  },

  goToHome: () => {
    const { currentScreen } = get();
    if (currentScreen === SCREEN.HOME) {
      set({ isPhoneVisible: false });
    } else {
      set({ currentScreen: SCREEN.HOME, activeApp: null });
    }
  },

  goBack: () => {
    const { currentScreen } = get();
    switch (currentScreen) {
      case SCREEN.CHAT_ROOM:
        // 채팅방 -> 채팅 목록으로 뒤로가기
        set({ currentScreen: SCREEN.CHAT_LIST, selectedChatId: null });
        break;
      case SCREEN.CHAT_LIST:
        // 채팅 목록 -> 홈으로 뒤로가기
        set({ currentScreen: SCREEN.HOME, activeApp: null });
        break;
      case SCREEN.HOME:
        break;
      default:
        set({ currentScreen: SCREEN.HOME });
    }
  },

  toggleEdgePanel: () => set((state) => ({ isEdgePanelOpen: !state.isEdgePanelOpen })),
  closeEdgePanel: () => set({ isEdgePanelOpen: false }),

  receiveNotification: (sender, message) => set({ notification: { sender, message } }),
}));
