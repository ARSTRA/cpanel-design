import React from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext.optimized";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 25px 30px;
  background: linear-gradient(135deg, #16a085 0%, #138d75 100%);
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  padding: 30px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MessageCard = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &.unread {
    border-left: 4px solid #e74c3c;
  }

  &.read {
    border-left: 4px solid #27ae60;
  }
`;

const MessageHeader = styled.div`
  padding: 20px;
  background: ${(props) => (props.read ? "#f8f9fa" : "#fff5f5")};
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SenderName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
`;

const SenderEmail = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

const MessageDate = styled.div`
  color: #7f8c8d;
  font-size: 12px;
`;

const MessageActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;

  &.read {
    background: #27ae60;
    color: white;
  }

  &.reply {
    background: #3498db;
    color: white;
  }

  &.delete {
    background: #e74c3c;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const MessageSubject = styled.div`
  padding: 15px 20px;
  font-weight: 600;
  color: #2c3e50;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e8ed;
`;

const MessageBody = styled.div`
  padding: 20px;
  color: #2c3e50;
  line-height: 1.6;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;

  &.unread {
    background: #fee;
    color: #e74c3c;
  }

  &.read {
    background: #e8f5e8;
    color: #27ae60;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;

  h3 {
    margin: 0 0 10px 0;
    font-size: 24px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;

export default function MessageManagement() {
  const { state, dispatch } = useApp();

  const handleMarkAsRead = (messageId) => {
    dispatch({ type: "MARK_MESSAGE_READ", payload: messageId });
  };

  const handleDelete = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      // Add delete message action to reducer if needed
      console.log("Delete message:", messageId);
    }
  };

  const handleReply = (message) => {
    // This would typically open an email client or modal
    const subject = `Re: ${message.subject}`;
    const body = `Dear ${message.name},\n\nThank you for your message. \n\n---\nOriginal message:\n${message.message}`;

    // Create mailto link
    const mailtoLink = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = state.messages.filter((msg) => !msg.read).length;

  return (
    <Container>
      <Header>
        <Title>
          Message Management {unreadCount > 0 && `(${unreadCount} unread)`}
        </Title>
      </Header>

      <Content>
        {state.messages.length === 0 ? (
          <EmptyState>
            <h3>📧 No Messages</h3>
            <p>
              When customers send messages through the contact form, they will
              appear here.
            </p>
          </EmptyState>
        ) : (
          <MessageList>
            {state.messages.map((message) => (
              <MessageCard
                key={message.id}
                className={message.read ? "read" : "unread"}
              >
                <MessageHeader read={message.read}>
                  <MessageInfo>
                    <SenderName>{message.name}</SenderName>
                    <SenderEmail>{message.email}</SenderEmail>
                    <MessageDate>{formatDate(message.date)}</MessageDate>
                  </MessageInfo>
                  <MessageActions>
                    <StatusBadge className={message.read ? "read" : "unread"}>
                      {message.read ? "Read" : "Unread"}
                    </StatusBadge>
                    {!message.read && (
                      <ActionButton
                        className="read"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        Mark as Read
                      </ActionButton>
                    )}
                    <ActionButton
                      className="reply"
                      onClick={() => handleReply(message)}
                    >
                      Reply
                    </ActionButton>
                    <ActionButton
                      className="delete"
                      onClick={() => handleDelete(message.id)}
                    >
                      Delete
                    </ActionButton>
                  </MessageActions>
                </MessageHeader>

                <MessageSubject>Subject: {message.subject}</MessageSubject>

                <MessageBody>{message.message}</MessageBody>
              </MessageCard>
            ))}
          </MessageList>
        )}
      </Content>
    </Container>
  );
}
