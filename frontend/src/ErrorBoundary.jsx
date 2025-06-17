import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI shows on next render
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service if needed
    console.error("🛑 Caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-400 p-4">
          <h2 className="text-xl font-bold">⚠️ Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
