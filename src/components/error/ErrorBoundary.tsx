"use client";

import React from "react";

import ErrorFallback from "./ErrorFallback";

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  Props,
  State
> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(
    error: Error
  ) {
    return {
      error,
    };
  }

  componentDidCatch(
    error: Error,
    info: React.ErrorInfo
  ) {
    console.error(error, info);
  }

  reset = () => {
    this.setState({
      error: null,
    });

    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorFallback
          error={this.state.error}
          reset={this.reset}
        />
      );
    }

    return this.props.children;
  }
}