// src/data/phoneData.js
import { FaUsers, FaCode, FaPaintBrush, FaTasks } from 'react-icons/fa';

// 채팅방 목록 (추후 API로 대체될 부분)
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