import { Component, type ReactNode } from "react";
import { ErrorScreen } from "@/lib/error-component";

type Props = { children: ReactNode };
type State = { error: unknown };

const AppErrorBoundary = class extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  retry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error !== null) {
      return <ErrorScreen error={this.state.error} onRetry={this.retry} />;
    }
    return this.props.children;
  }
};

export { AppErrorBoundary };
