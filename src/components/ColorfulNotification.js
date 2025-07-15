import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const NotificationCard = styled.div`
  background: ${(props) => {
    switch (props.type) {
      case "success":
        return "linear-gradient(135deg, #00b894 0%, #00a085 100%)";
      case "error":
        return "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
      case "warning":
        return "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)";
      case "info":
        return "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  }};
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  animation: ${(props) => (props.isLeaving ? slideOut : slideIn)} 0.3s ease-out;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    width: ${(props) => props.progress}%;
    transition: width 0.1s linear;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const NotificationIcon = styled.div`
  font-size: 24px;
  margin-right: 12px;
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: white;
  }
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.95;
`;

const getIcon = (type) => {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    case "info":
      return "ℹ️";
    default:
      return "📢";
  }
};

export function ColorfulNotification({
  id,
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
}) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100);
          if (newProgress <= 0) {
            handleClose();
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <NotificationCard type={type} isLeaving={isLeaving} progress={progress}>
      <NotificationHeader>
        <NotificationIcon>{getIcon(type)}</NotificationIcon>
        <NotificationTitle>{title}</NotificationTitle>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </NotificationHeader>
      {message && <NotificationMessage>{message}</NotificationMessage>}
    </NotificationCard>
  );
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Expose the addNotification function globally
  useEffect(() => {
    window.showNotification = addNotification;
    return () => {
      delete window.showNotification;
    };
  }, []);

  return (
    <NotificationContainer>
      {notifications.map((notification) => (
        <ColorfulNotification
          key={notification.id}
          {...notification}
          onClose={removeNotification}
        />
      ))}
    </NotificationContainer>
  );
}

// Utility function to show notifications from anywhere
export const showNotification = (type, title, message, duration = 5000) => {
  if (window.showNotification) {
    window.showNotification({ type, title, message, duration });
  }
};
