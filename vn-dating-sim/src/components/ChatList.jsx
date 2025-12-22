// src/components/ChatList.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';

const ChatList = () => {
  const { enterChatRoom } = usePhoneStore();

  // 더미 데이터 (나중에는 서버나 스토어에서 가져올 수 있음)
  const chatRooms = [
    {
      id: 'luna',
      name: '루나 🌙',
      profileBg: '#ffb6b9',
      profileIcon: '👩‍🦰',
      lastMessage: '선배, 뭐해요?',
      time: '방금',
      unread: 1,
    },
    {
      id: 'club',
      name: '마법 동아리',
      profileBg: '#a29bfe',
      profileIcon: '🔮',
      lastMessage: '다음 주 모임 공지입니다.',
      time: '어제',
      unread: 0,
    }
  ];

  return (
    <>
      {/* 상단 헤더 */}
      <S.ChatHeader>
        <S.ChatTitle>메시지</S.ChatTitle>
        <span style={{ fontSize: '20px' }}>🔍</span>
      </S.ChatHeader>

      {/* 채팅방 리스트 */}
      <S.ChatListContainer>
        {chatRooms.map((room) => (
          <S.ChatItem key={room.id} onClick={() => enterChatRoom(room.id)}>
            <S.ProfileImg $bg={room.profileBg}>
              {room.profileIcon}
            </S.ProfileImg>
            
            <S.ChatInfo>
              <S.ChatName>{room.name}</S.ChatName>
              <S.LastMessage>{room.lastMessage}</S.LastMessage>
            </S.ChatInfo>

            <S.ChatMeta>
              <span>{room.time}</span>
              {room.unread > 0 && (
                <S.UnreadBadge>{room.unread}</S.UnreadBadge>
              )}
            </S.ChatMeta>
          </S.ChatItem>
        ))}
      </S.ChatListContainer>
    </>
  );
};

export default ChatList;