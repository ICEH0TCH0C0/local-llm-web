// src/components/ChatRoom.jsx
import React, { useState, useRef, useEffect } from 'react';
import * as S from '../../../../styles/smartphone.styled';
import { usePhoneStore } from '../../../../store/phoneStore';
import { FaChevronLeft, FaEllipsisV, FaPlus, FaPaperPlane } from 'react-icons/fa';

// ✅ ChatList에서 데이터를 가져옵니다 (이름 자동 동기화)
import { CHAT_ROOM_DATA } from './data';
import { MdKeyboardReturn } from 'react-icons/md';

const ChatRoom = () => {
  const { goBack, selectedChatId, chats, addMessage } = usePhoneStore();
  const messageContainerRef = useRef(null);

  // ✅ ID로 방 정보 찾기
  const currentRoom = chats.find(room => room.id === selectedChatId);
  const roomName = currentRoom ? currentRoom.name : '알 수 없음';
  const messages = React.useMemo(() => (currentRoom ? currentRoom.messages : []), [currentRoom]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 스크롤 자동 이동
  useEffect(() => {
    if (messageContainerRef.current) {
      const { scrollHeight, clientHeight } = messageContainerRef.current;
      messageContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'User', text: input };
    addMessage(selectedChatId, userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("/api/game/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      const aiMsg = { sender: 'AI', text: data.reply };
      addMessage(selectedChatId, aiMsg);

    } catch (error) {
      console.error("Error:", error);
      addMessage(selectedChatId, { sender: 'System', text: '서버 연결 실패 😢' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={goBack}>
          <FaChevronLeft style={{ marginRight: '10px' }} />
          <S.ChatTitle>{roomName}</S.ChatTitle>
        </div>
        <FaEllipsisV style={{ color: '#bbb', cursor: 'pointer' }} />
      </S.ChatHeader>

      <S.MessageContainer ref={messageContainerRef}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender === 'User';
          const isSystem = msg.sender === 'System';

          // 단체방용 프로필 정보 (메시지 객체에 이름/색상이 있으면 사용)
          const senderName = msg.name || (currentRoom.type === 'individual' ? currentRoom.name : '익명');
          const senderColor = msg.color || (currentRoom.type === 'individual' ? currentRoom.profileBg : '#ddd');

          // 프로필 아이콘 찾기 (S.AvatarSmall 내부에 표시할 아이콘)
          const senderProfile = CHAT_ROOM_DATA.find(c => c.id === msg.sender);
          const profileIcon = senderProfile ? senderProfile.profileIcon : null;

          if (isSystem) {
            return (
              <div key={idx} style={{ textAlign: 'center', fontSize: '12px', color: '#888', margin: '10px 0' }}>
                {msg.text}
              </div>
            );
          }

          return (
            <S.MessageRow key={idx} $isMe={isMe}>
              {!isMe && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <S.AvatarSmall style={{ background: senderColor, marginTop: '0px', marginRight: '8px', width: '30px', height: '20px' }}>
                      {profileIcon || (
                        <span style={{ color: '#fff', fontSize: '12px' }}>
                          {senderName.substring(0, 1)}
                        </span>
                      )}
                    </S.AvatarSmall>
                    <span style={{ fontSize: '13px', color: '#666', fontWeight: 'bold' }}>
                      {senderName}
                    </span>
                  </div>
                  <S.Bubble $isMe={isMe}>
                    {msg.text}
                  </S.Bubble>
                </div>
              )}
              {isMe && (
                <S.Bubble $isMe={isMe}>
                  {msg.text}
                </S.Bubble>
              )}
            </S.MessageRow>
          );
        })}

        {isLoading && (
          <S.MessageRow $isMe={false}>
            <S.AvatarSmall>⏳</S.AvatarSmall>
            <S.Bubble $isMe={false}>...</S.Bubble>
          </S.MessageRow>
        )}
      </S.MessageContainer>

      <S.InputBar>
        <FaPlus style={{ color: '#ccc', marginRight: '10px', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }} />
        <S.ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지 입력"
          disabled={isLoading}
        />
        <S.SendButton onClick={handleSend} disabled={isLoading || !input.trim()}>
          <MdKeyboardReturn size={20} color="#333" />
        </S.SendButton>
      </S.InputBar>
    </>
  );
};

export default ChatRoom;