import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div className="error">
        <h1>Something went wrong ! 🙁</h1>
        <p>Make sure you have a stable internet connection then <strong>Try reloading the Page .</strong><br /> If the problem still persists <i><a href="mailto:chandrasekhar.2039@gmail.com">Conatct here.</a></i></p>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
