import { Client } from "@stomp/stompjs";
import axiosInstance from "./axiosInstance.js";



export const getLatestDeliveryLocation = (deliveryId) => {

    return axiosInstance.get(
        `/driver-location/delivery/${deliveryId}/latest`);
};

export const connectDeliveryTracking = (
    deliveryId,
    onLocationReceived,
    onConnected,
    onError
) => {

    const token = localStorage.getItem("token");

    if (!token) {

        if (onError) {
            onError(
                new Error("Token JWT introuvable")
            );
        }

        return null;
    }

    const client = new Client({

        brokerURL: "ws://localhost:8080/ws",

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        reconnectDelay: 5000,

        heartbeatIncoming: 10000,

        heartbeatOutgoing: 10000,

        onConnect: () => {

            console.log(
                "WebSocket connecté"
            );

            const destination =
                `/topic/deliveries/${deliveryId}/location`;


            client.subscribe(
                destination,
                (message) => {

                    try {

                        const location =
                            JSON.parse(
                                message.body
                            );

                        if (onLocationReceived) {

                            onLocationReceived(
                                location
                            );
                        }

                    } catch (error) {

                        console.error(
                            "Erreur parsing location WebSocket:",
                            error
                        );

                    }

                }
            );


            if (onConnected) {
                onConnected();
            }
        },

        onStompError: (frame) => {

            console.error(
                "Erreur STOMP:",
                frame
            );

            if (onError) {

                onError(
                    new Error(
                        frame.headers?.message ||
                        "Erreur WebSocket"
                    )
                );
            }
        },

        onWebSocketError: (event) => {

            console.error(
                "Erreur WebSocket:",
                event
            );

            if (onError) {

                onError(
                    new Error(
                        "Connexion WebSocket impossible"
                    )
                );
            }
        },

        onWebSocketClose: () => {

            console.log(
                "WebSocket déconnecté"
            );
        },
    });

    client.activate();

    return client;
};

export const disconnectDeliveryTracking = async (
    client
) => {

    if (
        client &&
        client.active
    ) {

        try {

            await client.deactivate();

            console.log(
                "WebSocket tracking fermé"
            );

        } catch (error) {

            console.error(
                "Erreur fermeture WebSocket:",
                error
            );
        }
    }
};