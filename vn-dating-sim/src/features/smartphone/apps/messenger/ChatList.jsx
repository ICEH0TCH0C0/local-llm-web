// src/components/ChatList.jsx
import React from 'react';
import * as S from '../../../../styles/smartphone.styled';
import { usePhoneStore } from '../../../../store/phoneStore';
import { FaSearch } from 'react-icons/fa';
import { CHAT_ROOM_DATA } from './data.jsx';

const ChatList = () => {
  const { enterChatRoom, chats } = usePhoneStore();

  return (
    <>
      <S.ChatHeader>
        <S.ChatTitle>메시지</S.ChatTitle>
        <FaSearch style={{ color: '#888', cursor: 'pointer' }} />
      </S.ChatHeader>

      <S.ChatListContainer>
        {chats.map((room) => (
          <S.ChatItem key={room.id} onClick={() => enterChatRoom(room.id)}>
            <S.ProfileImg $bg={room.profileBg}>
              {room.profileIcon}
            </S.ProfileImg>

            <S.ChatInfo>
              <S.ChatName>
                {room.name}
                {room.type === 'group' && <span style={{ color: '#999', fontSize: '12px', marginLeft: '5px' }}>5</span>}
              </S.ChatName>
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