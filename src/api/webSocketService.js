import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = ({
                                     token,
                                     onNotification,
                                     onConnected,
                                     onError,
                                 }) => {

    if (stompClient?.active) {
        return stompClient;
    }

    stompClient = new Client({

        brokerURL:
        import.meta.env.VITE_WEBSOCKET_URL,

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        reconnectDelay: 5000,

        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: () => {

            console.log(
                "WebSocket connecté"
            );

            stompClient.subscribe(
                "/user/queue/notifications",
                (message) => {

                    try {

                        const notification =
                            JSON.parse(
                                message.body
                            );

                        onNotification?.(
                            notification
                        );

                    } catch (error) {

                        console.error(
                            "Erreur notification WebSocket:",
                            error
                        );
                    }
                }
            );

            onConnected?.();
        },

        onStompError: (frame) => {

            console.error(
                "Erreur STOMP:",
                frame
            );

            onError?.(frame);
        },

        onWebSocketError: (error) => {

            console.error(
                "Erreur WebSocket:",
                error
            );

            onError?.(error);
        },
    });

    stompClient.activate();

    return stompClient;
};

export const disconnectWebSocket = () => {

    if (stompClient) {

        stompClient.deactivate();

        stompClient = null;
    }
};