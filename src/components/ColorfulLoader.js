import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
`;

const wave = keyframes`
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1.0); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: ${(props) => (props.fullHeight ? "50vh" : "auto")};
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #ff6b6b;
  border-right: 4px solid #74b9ff;
  border-bottom: 4px solid #fd79a8;
  border-left: 4px solid #fdcb6e;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const InnerSpinner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 3px solid transparent;
  border-top: 3px solid #fdcb6e;
  border-right: 3px solid #ff6b6b;
  border-bottom: 3px solid #74b9ff;
  border-left: 3px solid #fd79a8;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite reverse;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
`;

const WaveLoader = styled.div`
  display: flex;
  gap: 4px;
  align-items: end;
  height: 40px;
  margin: 20px 0;
`;

const WaveBar = styled.div`
  width: 6px;
  height: 40px;
  background: ${(props) => props.color};
  border-radius: 3px;
  animation: ${wave} 1.2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-align: center;
  background: linear-gradient(45deg, #ff6b6b, #74b9ff, #fd79a8, #fdcb6e);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${spin} 3s linear infinite;
`;

export default function ColorfulLoader({
  type = "spinner",
  text = "Loading...",
  fullHeight = false,
}) {
  const renderLoader = () => {
    switch (type) {
      case "dots":
        return (
          <>
            <Dots>
              <Dot color="#ff6b6b" delay="0s" />
              <Dot color="#74b9ff" delay="0.2s" />
              <Dot color="#fd79a8" delay="0.4s" />
              <Dot color="#fdcb6e" delay="0.6s" />
            </Dots>
            <LoadingText>{text}</LoadingText>
          </>
        );

      case "wave":
        return (
          <>
            <WaveLoader>
              <WaveBar color="#ff6b6b" delay="0s" />
              <WaveBar color="#74b9ff" delay="0.1s" />
              <WaveBar color="#fd79a8" delay="0.2s" />
              <WaveBar color="#fdcb6e" delay="0.3s" />
              <WaveBar color="#55a3ff" delay="0.4s" />
            </WaveLoader>
            <LoadingText>{text}</LoadingText>
          </>
        );

      default:
        return (
          <>
            <SpinnerContainer>
              <Spinner />
              <InnerSpinner />
            </SpinnerContainer>
            <LoadingText>{text}</LoadingText>
          </>
        );
    }
  };

  return (
    <LoaderContainer fullHeight={fullHeight}>
      <div>{renderLoader()}</div>
    </LoaderContainer>
  );
}
