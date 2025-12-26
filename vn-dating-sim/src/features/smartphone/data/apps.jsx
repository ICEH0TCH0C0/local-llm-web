import React from 'react';
// 아이콘들을 한곳에서 관리
import { FaCommentDots, FaImages, FaMapMarkedAlt, FaCalendarAlt, FaClock, FaCog } from 'react-icons/fa';

export const APPS = [
  { id: 'messenger', name: 'Talk', icon: <FaCommentDots />, color: '#ffeaa7' },
  { id: 'gallery',   name: '갤러리',   icon: <FaImages />,      color: '#ff7675' },
  { id: 'map',       name: '지도',     icon: <FaMapMarkedAlt />, color: '#55efc4' },
  { id: 'calendar',  name: '캘린더',   icon: <FaCalendarAlt />,  color: '#74b9ff' },
  { id: 'clock',     name: '시계',     icon: <FaClock />,        color: '#a29bfe' },
  { id: 'settings',  name: '설정',     icon: <FaCog />,          color: '#b2bec3' },
];