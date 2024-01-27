import { Component } from 'react';

interface IWebSockTestState {
  ws: WebSocket | null;
}

class WebSockTest extends Component<{}, IWebSockTestState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ws: null,
    };
  }

  componentDidMount() {
    this.connectWebSocket();
  }

  connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/signal/1');
    
    ws.onopen = () => {
      console.log('WebSocket connected');

    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting...');
      setTimeout(this.connectWebSocket, 3000);
    };

    this.setState({ ws });
  };

  render() {
    return (
      <div>
        <h1>WebSocket Test Component</h1>
      </div>
    );
  }
}

export default WebSockTest;
