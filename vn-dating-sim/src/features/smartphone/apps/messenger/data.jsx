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
        lastMessage: '이유리: 와! 새로 오신 분인가요? 환영해요!!',
        time: '10:30',
        unread: 1,
        messages: [
            {
                sender: 'System',
                text: 'Hello World 🌍 그룹에 초대되었습니다.'
            },
            {
                sender: 'sera',
                name: '강세라',
                color: '#a29bfe',
                text: '이번 주 스터디 주제는 리액트 훅입니다. 다들 준비해오세요.'
            },
            {
                sender: 'yuri',
                name: '이유리',
                color: '#ffeaa7',
                text: '와! 새로 오신 분인가요? 환영해요!!'
            }
        ]
    },
    {
        id: 'yuri',
        name: '이유리 (FE 팀장)',
        type: 'individual',
        profileBg: '#ffeaa7',
        profileIcon: <FaCode color="#d35400" />,
        lastMessage: '',
        time: '',
        unread: 0,
        messages: []
    },
    {
        id: 'sera',
        name: '강세라 (BE 팀장)',
        type: 'individual',
        profileBg: '#a29bfe',
        profileIcon: <FaCode color="#fff" />,
        lastMessage: '',
        time: '',
        unread: 0,
        messages: []
    },
    {
        id: 'minji',
        name: '김민지 (디자인)',
        type: 'individual',
        profileBg: '#ff7675',
        profileIcon: <FaPaintBrush color="#fff" />,
        lastMessage: '',
        time: '',
        unread: 0,
        messages: []
    },
    {
        id: 'siyeon',
        name: '박시연 (기획)',
        type: 'individual',
        profileBg: '#55efc4',
        profileIcon: <FaTasks color="#fff" />,
        lastMessage: '',
        time: '',
        unread: 0,
        messages: []
    }
];