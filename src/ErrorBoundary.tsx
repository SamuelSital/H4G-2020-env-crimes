import React from "react";
import { Card } from "rebass";

class ErrorBoundary extends React.Component<any, { hasError?: boolean, error?: Error }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      
      // You can render any custom fallback UI
      return (
        <Card>
          <h3>Something went wrong :(</h3>
        </Card>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
