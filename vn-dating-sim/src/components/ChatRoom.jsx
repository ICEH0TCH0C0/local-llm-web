// src/components/ChatRoom.jsx
import React, { useState, useRef, useEffect } from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';
import { FaChevronLeft, FaEllipsisV, FaPlus, FaPaperPlane } from 'react-icons/fa';

// ✅ ChatList에서 데이터를 가져옵니다 (이름 자동 동기화)
import { CHAT_ROOM_DATA } from './ChatList';

const ChatRoom = () => {
  const { goBack, selectedChatId } = usePhoneStore();
  const messageContainerRef = useRef(null);
  
  // ✅ ID로 방 정보 찾기 (없으면 '알 수 없음')
  const currentRoom = CHAT_ROOM_DATA.find(room => room.id === selectedChatId);
  const roomName = currentRoom ? currentRoom.name : '알 수 없음';
  
  const [messages, setMessages] = useState([
    { sender: 'System', text: `${roomName} 님과의 대화가 시작되었습니다.` }
  ]);
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
    setMessages(prev => [...prev, userMsg]);
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
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'System', text: '서버 연결 실패 😢' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={goBack}>
          <FaChevronLeft style={{ marginRight: '10px' }} />
          {/* ✅ 연동된 이름 표시 */}
          <S.ChatTitle>{roomName}</S.ChatTitle>
        </div>
        <FaEllipsisV style={{ color: '#bbb', cursor: 'pointer' }} />
      </S.ChatHeader>

      <S.MessageContainer ref={messageContainerRef}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender === 'User';
          const isSystem = msg.sender === 'System';

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
                <S.AvatarSmall style={{ background: currentRoom?.profileBg || '#ddd' }}>
                  {/* 이름 첫 글자 표시 */}
                  <span style={{color: '#fff', fontSize: '14px'}}>
                     {currentRoom ? currentRoom.name.substring(0,1) : '?'}
                   </span>
                </S.AvatarSmall>
              )}
              <S.Bubble $isMe={isMe}>
                {msg.text}
              </S.Bubble>
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
        <FaPlus style={{ color: '#ccc', marginRight: '10px', fontSize: '18px', cursor: 'pointer' }} />
        <S.ChatInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지 입력"
          disabled={isLoading}
        />
        <S.SendButton onClick={handleSend} disabled={isLoading || !input.trim()}>
          <FaPaperPlane size={14} color="#333" />
        </S.SendButton>
      </S.InputBar>
    </>
  );
};

export default ChatRoom;