import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import {
    sendDriverLocation,
} from "../api/driverLocationService.js";


const useDriverLocation = (enabled) => {

    const watchIdRef = useRef(null);

    const lastSentRef = useRef(0);


    useEffect(() => {

        if (!enabled) {

            if (watchIdRef.current !== null) {

                navigator.geolocation.clearWatch(
                    watchIdRef.current
                );

                watchIdRef.current = null;
            }

            return;
        }


        if (!navigator.geolocation) {

            toast.error(
                "La géolocalisation n'est pas supportée par votre navigateur."
            );

            return;
        }


        watchIdRef.current =
            navigator.geolocation.watchPosition(

                async (position) => {

                    const now = Date.now();

                    

                    if (
                        now -
                        lastSentRef.current <
                        10000
                    ) {
                        return;
                    }


                    const {
                        latitude,
                        longitude,
                    } = position.coords;


                    try {

                        await sendDriverLocation(
                            latitude,
                            longitude
                        );

                        lastSentRef.current =
                            now;

                    } catch (error) {

                        console.error(
                            "Erreur envoi localisation:",
                            error
                        );

                    }
                },


                (error) => {

                    console.error(
                        "Erreur géolocalisation:",
                        error
                    );


                    if (
                        error.code ===
                        error.PERMISSION_DENIED
                    ) {

                        toast.error(
                            "Veuillez autoriser l'accès à votre localisation."
                        );

                    } else if (
                        error.code ===
                        error.POSITION_UNAVAILABLE
                    ) {

                        toast.error(
                            "Votre position est actuellement indisponible."
                        );

                    } else if (
                        error.code ===
                        error.TIMEOUT
                    ) {

                        console.warn(
                            "Délai de géolocalisation dépassé."
                        );
                    }
                },


                {
                    enableHighAccuracy: true,
                    maximumAge: 5000,
                    timeout: 10000,
                }
            );


        return () => {

            if (
                watchIdRef.current !== null
            ) {

                navigator.geolocation.clearWatch(
                    watchIdRef.current
                );

                watchIdRef.current = null;
            }
        };

    }, [enabled]);

};


export default useDriverLocation;