import React, { useState } from 'react';
import './adminAlert.css';

const AdminAlert = () => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotification = { recipient, title, content };
    setNotifications([...notifications, newNotification]);
    setRecipient('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="notification-form">
      <h2>알림 보내기</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="recipient">받는 사람:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">알림 보내기</button>
        </div>
      </form>
      
    </div>
  );
};

export default AdminAlert;