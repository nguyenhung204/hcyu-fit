import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  
  const randomMessages = [
    "👋 Created by Ban Công Nghệ",
    "Nhớ tham gia group lớp nhé",
    "Nhớ tham gia group cộng đồng nhé",
    "Cố gắng lên, bạn làm được!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Hiển thị message random
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      setCurrentMessage(randomMessages[randomIndex]);
      setIsVisible(true);
      
      // Ẩn message sau 3 giây
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChatClick = () => {
    window.open('https://web.facebook.com/profile.php?id=61572321333029&locale=vi_VN', '_blank');
  };

  return (
    <div className="chat-box-container">
      {/* Message bubble */}
      {isVisible && (
        <div className="chat-message">
          {currentMessage}
        </div>
      )}
      
      {/* Chat icon with BCN avatar */}
      <div className="chat-icon" onClick={handleChatClick}>
            <img className="avatar" src="./BCN.png" alt="BCN Avatar" />
        <div className="chat-indicator">
          <div className="pulse-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
