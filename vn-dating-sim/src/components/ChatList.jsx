// src/components/ChatList.jsx
import React from 'react';
import * as S from '../styles/smartphone.styled';
import { usePhoneStore } from '../store/phoneStore';
import { FaSearch, FaUsers, FaCode, FaPaintBrush, FaTasks } from 'react-icons/fa';

// ✅ 채팅방 데이터를 외부로 내보냅니다 (ChatRoom에서 사용)
export const CHAT_ROOM_DATA = [
  {
    id: 'club_main',
    name: 'Hello World 🌍',
    type: 'group',
    profileBg: '#74b9ff',
    profileIcon: <FaUsers color="#fff" />, 
    lastMessage: '강세라: 다음 주 스프린트 일정 공지합니다. 필독.',
    time: '10:30',
    unread: 3,
  },
  {
    id: 'yuri',
    name: '이유리 (FE 팀장)',
    type: 'individual',
    profileBg: '#ffeaa7',
    profileIcon: <FaCode color="#d35400" />,
    lastMessage: '선배님! 오늘 점심 같이 드실래요? ㅎㅎ',
    time: '방금',
    unread: 1,
  },
  {
    id: 'sera',
    name: '강세라 (BE 팀장)',
    type: 'individual',
    profileBg: '#a29bfe',
    profileIcon: <FaCode color="#fff" />,
    lastMessage: 'PR 올리신 거 봤습니다. 코멘트 확인하세요.',
    time: '어제',
    unread: 0,
  },
  {
    id: 'minji',
    name: '김민지 (디자인)',
    type: 'individual',
    profileBg: '#ff7675',
    profileIcon: <FaPaintBrush color="#fff" />,
    lastMessage: '이번 UI 시안 수정본 보냈어요!',
    time: '어제',
    unread: 0,
  },
  {
    id: 'siyeon',
    name: '박시연 (기획)',
    type: 'individual',
    profileBg: '#55efc4',
    profileIcon: <FaTasks color="#fff" />,
    lastMessage: '기획서 v1.2 업데이트 되었습니다.',
    time: '2일 전',
    unread: 0,
  }
];

const ChatList = () => {
  const { enterChatRoom } = usePhoneStore();

  return (
    <>
      <S.ChatHeader>
        <S.ChatTitle>메시지</S.ChatTitle>
        <FaSearch style={{ color: '#888', cursor: 'pointer' }} />
      </S.ChatHeader>

      <S.ChatListContainer>
        {CHAT_ROOM_DATA.map((room) => (
          <S.ChatItem key={room.id} onClick={() => enterChatRoom(room.id)}>
            <S.ProfileImg $bg={room.profileBg}>
              {room.profileIcon}
            </S.ProfileImg>
            
            <S.ChatInfo>
              <S.ChatName>
                {room.name}
                {room.type === 'group' && <span style={{color: '#999', fontSize: '12px', marginLeft: '5px'}}>5</span>}
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