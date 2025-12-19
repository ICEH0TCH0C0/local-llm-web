// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'AI', text: '구매할 생각없으면, 나가줄래? 😠' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 현재 시간 가져오기 (상단바용)
  const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      const aiMsg = { sender: 'AI', text: data.reply };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'System', text: '지금은 대답하기 곤란해... (서버 연결 실패)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="phone-frame">
      
      {/* 1. 상단 상태바 (Status Bar) */}
      <div className="status-bar">
        <span>{currentTime}</span>
        <div style={{display: 'flex', gap: '5px'}}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 2. 앱 헤더 (App Header) */}
      <header className="chat-header">
        <span className="back-btn">❮</span>
        <div className="profile-pic">👩‍🦰</div> {/* 이미지 URL 대신 이모지 임시 사용 */}
        <div className="profile-info">
          <h2>루나 상점 🌙</h2>
          <span>● Online</span>
        </div>
      </header>

      {/* 3. 메시지 리스트 */}
      <div className="message-list">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.sender === 'User' ? 'my-msg' : 'ai-msg'}`}>
            
            {/* AI일 때만 프로필 사진 표시 */}
            {msg.sender === 'AI' && <div className="ai-avatar">👩‍🦰</div>}
            
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="loading-indicator">입력 중... 💬</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* 4. 하단 입력창 */}
      <div className="input-area">
        <span className="plus-btn">+</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지를 입력하세요"
          disabled={isLoading}
        />
        <button className="send-btn" onClick={handleSend} disabled={isLoading}>
          ➤
        </button>
      </div>
    </div>
  );
}

export default App;