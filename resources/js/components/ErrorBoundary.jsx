import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Error occurred</h1>;
    }

    return this.props.children;
  }
}
