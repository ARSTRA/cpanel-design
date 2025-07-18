import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  text-align: center;
  padding: 20px;
`;

const ErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });

    // Attempt to reload the page
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorTitle>🔧 Something went wrong</ErrorTitle>
            <ErrorMessage>
              We encountered an unexpected error. This could be due to a network
              issue or a temporary problem with the application.
            </ErrorMessage>
            <RetryButton onClick={this.handleRetry}>Try Again</RetryButton>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details style={{ marginTop: "20px", textAlign: "left" }}>
                <summary style={{ cursor: "pointer", marginBottom: "10px" }}>
                  Error Details (Development)
                </summary>
                <pre
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    overflow: "auto",
                    maxHeight: "200px",
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
