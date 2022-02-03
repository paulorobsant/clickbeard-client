import { useRef, useState } from 'react';

const useWebSocket = ({ url }: any) => {
	const [isConnected, setIsConnected] = useState(false);
	const webSocket = useRef() as any;

	const connect = () => {
		const socket = new WebSocket(url);

		socket.binaryType = 'blob';

		socket.onopen = () => {
			setIsConnected(true);
		};

		socket.onclose = () => {
			setIsConnected(false);
		};

		webSocket.current = socket;
	};

	const close = () => {
		if (webSocket.current && webSocket.current.close) {
			webSocket.current.close();
		}
	};

	return { connect, close, isConnected };
};

export default useWebSocket;
