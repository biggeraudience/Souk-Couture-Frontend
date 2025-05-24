// src/pages/customer/CustomerMessagesPage.jsx
import React, { useState, useEffect } from 'react';
import CustomerMessageCard from '../../components/customer/CustomerMessageCard';
import '../../styles/pages/customer/_customer-messages.scss';

const mockMessages = [
  {
    id: 'msg1',
    subject: 'Issue with Order #12345',
    lastMessageSnippet: 'Thank you for your patience, we are looking into this.',
    lastMessageDate: '2025-05-20T10:00:00Z',
    status: 'Awaiting Reply',
    unread: true,
    thread: [
      { sender: 'customer', message: 'I have not received my order yet.', date: '2025-05-18T14:30:00Z' },
      { sender: 'admin', message: 'We apologize for the delay. Your order is currently being processed.', date: '2025-05-19T09:00:00Z' },
      { sender: 'admin', message: 'Thank you for your patience, we are looking into this.', date: '2025-05-20T10:00:00Z' },
    ],
  },
  {
    id: 'msg2',
    subject: 'Question about Product XYZ',
    lastMessageSnippet: 'The product is available in size Medium.',
    lastMessageDate: '2025-05-15T11:00:00Z',
    status: 'Closed',
    unread: false,
    thread: [
      { sender: 'customer', message: 'Is product XYZ available in size M?', date: '2025-05-14T16:00:00Z' },
      { sender: 'admin', message: 'Yes, the product is available in size Medium.', date: '2025-05-15T11:00:00Z' },
    ],
  },
  {
    id: 'msg3',
    subject: 'General Inquiry',
    lastMessageSnippet: 'We will get back to you within 24 hours.',
    lastMessageDate: '2025-05-22T14:00:00Z',
    status: 'Open',
    unread: true,
    thread: [
      { sender: 'customer', message: 'I have a general question about your services.', date: '2025-05-22T13:00:00Z' },
      { sender: 'admin', message: 'Thank you for your inquiry. We will get back to you within 24 hours.', date: '2025-05-22T14:00:00Z' },
    ],
  },
];

const CustomerMessagesPage = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessageSubject, setNewMessageSubject] = useState('');
  const [newMessageBody, setNewMessageBody] = useState('');
  const [replyMessageBody, setReplyMessageBody] = useState('');
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  useEffect(() => {
    // In a real app, fetch messages from backend here
  }, []);

  const handleMessageClick = (id) => {
    const message = messages.find(msg => msg.id === id);
    if (message) {
      setSelectedMessage({ ...message, unread: false }); // Mark as read
      setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
      setShowNewMessageForm(false); // Hide new message form when viewing a thread
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageSubject.trim() || !newMessageBody.trim()) {
      alert('Subject and Message cannot be empty.');
      return;
    }

    const newMsgId = `msg${Date.now()}`;
    const newThread = {
      id: newMsgId,
      subject: newMessageSubject,
      lastMessageSnippet: newMessageBody.substring(0, 50) + '...',
      lastMessageDate: new Date().toISOString(),
      status: 'Open',
      unread: false, // Customer initiated, so initially read
      thread: [
        { sender: 'customer', message: newMessageBody, date: new Date().toISOString() },
      ],
    };

    setMessages(prev => [newThread, ...prev]); // Add new message to top
    setSelectedMessage(newThread);
    setNewMessageSubject('');
    setNewMessageBody('');
    setShowNewMessageForm(false);
    alert('Message sent!');
    // In a real app, send to backend
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyMessageBody.trim()) {
      alert('Reply cannot be empty.');
      return;
    }

    if (selectedMessage) {
      const updatedThread = [...selectedMessage.thread, { sender: 'customer', message: replyMessageBody, date: new Date().toISOString() }];
      const updatedMessage = {
        ...selectedMessage,
        thread: updatedThread,
        lastMessageSnippet: replyMessageBody.substring(0, 50) + '...',
        lastMessageDate: new Date().toISOString(),
        status: 'Awaiting Reply', // Status changes after customer replies
        unread: false // The customer just sent it, so it's 'read' by them
      };

      setMessages(prev => prev.map(msg => msg.id === selectedMessage.id ? updatedMessage : msg));
      setSelectedMessage(updatedMessage);
      setReplyMessageBody('');
      alert('Reply sent!');
      // In a real app, send to backend
    }
  };

  const handleComposeNew = () => {
    setSelectedMessage(null); // Clear selected message
    setShowNewMessageForm(true);
  };

  return (
    <div className="customer-messages-page">
      <div className="customer-messages-page__header">
        <h1>My Messages</h1>
        <button className="btn" onClick={handleComposeNew}>
          Compose New Message
        </button>
      </div>

      <div className="customer-messages-page__content">
        <div className="customer-messages-page__inbox">
          <h2>Inbox</h2>
          {messages.length === 0 ? (
            <p className="customer-messages-page__inbox--empty">No messages yet.</p>
          ) : (
            messages.map(msg => (
              <CustomerMessageCard key={msg.id} message={msg} onClick={handleMessageClick} />
            ))
          )}
        </div>

        <div className="customer-messages-page__detail-view">
          {showNewMessageForm ? (
            <>
              <h2>Compose New Message</h2>
              <form onSubmit={handleSendMessage} className="customer-messages-page__detail-view-form">
                <div className="form-group">
                  <label htmlFor="newMessageSubject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="newMessageSubject"
                    className="form-input"
                    value={newMessageSubject}
                    onChange={(e) => setNewMessageSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newMessageBody" className="form-label">Message</label>
                  <textarea
                    id="newMessageBody"
                    className="form-textarea"
                    value={newMessageBody}
                    onChange={(e) => setNewMessageBody(e.target.value)}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </>
          ) : selectedMessage ? (
            <>
              <h2>{selectedMessage.subject}</h2>
              <div className="customer-messages-page__detail-view-conversation">
                {selectedMessage.thread.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-bubble message-bubble--${msg.sender}`}
                  >
                    <p>{msg.message}</p>
                    <small>{new Date(msg.date).toLocaleString()}</small>
                  </div>
                ))}
              </div>
              <form onSubmit={handleReply} className="customer-messages-page__detail-view-form">
                <div className="form-group">
                  <label htmlFor="replyMessage" className="form-label">Reply</label>
                  <textarea
                    id="replyMessage"
                    className="form-textarea"
                    value={replyMessageBody}
                    onChange={(e) => setReplyMessageBody(e.target.value)}
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn">Send Reply</button>
              </form>
            </>
          ) : (
            <p className="text-muted text-center">Select a message from the inbox or compose a new one.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerMessagesPage;