import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const ChatOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  height: 600px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: ${(props) => (props.isOpen ? slideUp : slideDown)} 0.4s
    cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  @media (max-width: 768px) {
    height: 80vh;
    margin: 20px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AgentAvatar = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const AgentDetails = styled.div`
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 2px 0 0 0;
    font-size: 12px;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const OnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #00b894;
  border-radius: 50%;
  animation: ${typing} 2s ease-in-out infinite;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
`;

const Message = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: flex-end;
  gap: 8px;

  &.user {
    flex-direction: row-reverse;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;

  &.user {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-right-radius: 4px;
  }

  &.agent {
    background: white;
    color: #2c3e50;
    border: 1px solid #e1e8ed;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: #7f8c8d;
  opacity: 0.7;
  margin: 0 8px;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  max-width: 80px;
  border: 1px solid #e1e8ed;

  .dot {
    width: 6px;
    height: 6px;
    background: #7f8c8d;
    border-radius: 50%;
    animation: ${typing} 1.4s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const ChatInput = styled.div`
  background: white;
  padding: 20px;
  border-top: 1px solid #e1e8ed;
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const MessageInput = styled.textarea`
  width: 100%;
  border: 2px solid #e1e8ed;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const QuickReply = styled.button`
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const SupportChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Sarah, your customer support specialist. How can I help you today? 😊",
      sender: "agent",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Product information",
    "Shipping details",
    "Return policy",
    "Payment help",
    "Track my order",
  ];

  const autoResponses = {
    "product information":
      "I'd be happy to help you with product information! What specific firearm or accessory are you interested in learning about?",
    "shipping details":
      "We offer fast shipping to your local FFL dealer. Standard shipping takes 3-5 business days, and expedited shipping is available for 1-2 day delivery.",
    "return policy":
      "We offer a 30-day return policy for unused items in original packaging. Please note that firearms must be returned to our FFL dealer.",
    "payment help":
      "We accept all major credit cards, PayPal, and financing options through Affirm. All payments are processed securely with 256-bit encryption.",
    "track my order":
      "To track your order, please provide your order number and I'll get you the latest shipping information right away!",
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate agent typing and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);

        const lowerText = inputValue.toLowerCase();
        let response =
          "Thank you for your message! Our team will get back to you shortly. Is there anything else I can help you with?";

        // Check for auto-responses
        Object.keys(autoResponses).forEach((key) => {
          if (lowerText.includes(key)) {
            response = autoResponses[key];
          }
        });

        const agentResponse = {
          id: Date.now() + 1,
          text: response,
          sender: "agent",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, agentResponse]);
      }, 2000);
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatOverlay isOpen={isOpen} onClick={onClose}>
      <ChatContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <ChatHeader>
          <HeaderInfo>
            <AgentAvatar>👩‍💼</AgentAvatar>
            <AgentDetails>
              <h3>Sarah Johnson</h3>
              <p>
                <OnlineIndicator />
                Online - Support Specialist
              </p>
            </AgentDetails>
          </HeaderInfo>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ChatHeader>

        <ChatMessages>
          {messages.map((message) => (
            <Message key={message.id} className={message.sender}>
              <MessageBubble className={message.sender}>
                {message.text}
              </MessageBubble>
              <MessageTime>{message.time}</MessageTime>
            </Message>
          ))}

          {isTyping && (
            <Message className="agent">
              <TypingIndicator>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </TypingIndicator>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInput>
          <InputContainer>
            <MessageInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
            />
            <QuickReplies>
              {quickReplies.map((reply, index) => (
                <QuickReply key={index} onClick={() => handleQuickReply(reply)}>
                  {reply}
                </QuickReply>
              ))}
            </QuickReplies>
          </InputContainer>
          <SendButton onClick={handleSendMessage} disabled={!inputValue.trim()}>
            📤
          </SendButton>
        </ChatInput>
      </ChatContainer>
    </ChatOverlay>
  );
};

export default SupportChat;
