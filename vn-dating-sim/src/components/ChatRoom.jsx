// src/components/ChatRoom.jsx
import React, { useState, useRef, useEffect } from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';

const ChatRoom = () => {
  const { goBack, selectedChatId } = usePhoneStore();
  
  const [messages, setMessages] = useState([
    { sender: 'AI', text: '안녕! 나는 루나야. 🌙 무엇을 도와줄까?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ [변경 1] 스크롤 박스 자체를 잡기 위한 Ref
  const messageContainerRef = useRef(null);

  // ✅ [변경 2] 메시지가 추가될 때마다 scrollTop을 맨 아래로 설정
  useEffect(() => {
    if (messageContainerRef.current) {
      const { scrollHeight, clientHeight } = messageContainerRef.current;
      
      // 부드러운 스크롤 대신 즉시 이동 (화면 튀는 현상 방지)
      // 필요하다면 { behavior: 'smooth' } 옵션을 줄 수 있는 scrollTo() 사용 가능
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
      setMessages(prev => [...prev, { sender: 'System', text: '서버와 연결할 수 없습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={goBack}>
          <span style={{ fontSize: '20px', marginRight: '10px' }}>❮</span>
          <S.ChatTitle>
            {selectedChatId === 'luna' ? '루나 🌙' : '알 수 없음'}
          </S.ChatTitle>
        </div>
        <span>⋮</span>
      </S.ChatHeader>

      {/* ✅ [변경 3] Ref를 컨테이너에 직접 연결 */}
      <S.MessageContainer ref={messageContainerRef}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender === 'User';
          return (
            <S.MessageRow key={idx} $isMe={isMe}>
              {!isMe && <S.AvatarSmall>👩‍🦰</S.AvatarSmall>}
              <S.Bubble $isMe={isMe}>
                {msg.text}
              </S.Bubble>
            </S.MessageRow>
          );
        })}
        
        {isLoading && (
          <S.MessageRow $isMe={false}>
            <S.AvatarSmall>👩‍🦰</S.AvatarSmall>
            <S.Bubble $isMe={false}>입력 중... 💬</S.Bubble>
          </S.MessageRow>
        )}
        
        {/* 기존 <div ref={messagesEndRef} /> 삭제됨 */}
      </S.MessageContainer>

      <S.InputBar>
        <span style={{ fontSize: '20px', color: '#ccc', marginRight: '10px' }}>+</span>
        <S.ChatInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지를 입력하세요"
          disabled={isLoading}
        />
        <S.SendButton onClick={handleSend} disabled={isLoading || !input.trim()}>
          ➤
        </S.SendButton>
      </S.InputBar>
    </>
  );
};

export default ChatRoom;