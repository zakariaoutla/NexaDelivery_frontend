import {
    Map,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

import {
    useEffect,
} from "react";


const DEFAULT_POSITION = {
    lat: 32.3373,
    lng: -6.3498,
};


function MapController({
                           latitude,
                           longitude,
                       }) {

    const map = useMap();


    useEffect(() => {

        if (
            !map ||
            latitude == null ||
            longitude == null
        ) {
            return;
        }


        const position = {
            lat: Number(latitude),
            lng: Number(longitude),
        };


        map.panTo(position);
        map.setZoom(16);

    }, [
        map,
        latitude,
        longitude,
    ]);


    return null;
}


export default function CollectionPointMap({
                                               latitude,
                                               longitude,
                                               onLocationChange,
                                           }) {

    const geocoding =
        useMapsLibrary("geocoding");

    const places =
        useMapsLibrary("places");


    const selectedPosition =
        latitude != null &&
        longitude != null
            ? {
                lat: Number(latitude),
                lng: Number(longitude),
            }
            : null;

    

    const getAddressFromCoordinates =
        async (lat, lng) => {

            if (!geocoding) {
                return "";
            }


            try {

                const geocoder =
                    new geocoding.Geocoder();


                const response =
                    await geocoder.geocode({
                        location: {
                            lat,
                            lng,
                        },
                    });


                if (
                    !response.results ||
                    response.results.length === 0
                ) {
                    return "";
                }


                const normalAddress =
                    response.results.find(
                        (result) =>
                            !result.types?.includes(
                                "plus_code"
                            )
                    );


                return (
                    normalAddress
                        ?.formatted_address ||
                    response.results[0]
                        ?.formatted_address ||
                    ""
                );

            } catch (error) {

                console.error(
                    "Erreur reverse geocoding:",
                    error
                );

                return "";
            }
        };



    const handleMapClick =
        async (event) => {

            if (!event.detail.latLng) {
                return;
            }


            const {
                lat,
                lng,
            } = event.detail.latLng;


            let address = "";


            try {

                /*
                 * If the user clicked directly on a
                 * Google Maps POI, Google can provide
                 * its placeId.
                 */

                const placeId =
                    event.detail.placeId;


                if (
                    placeId &&
                    places
                ) {

                    const place =
                        new places.Place({
                            id: placeId,
                        });


                    await place.fetchFields({
                        fields: [
                            "displayName",
                            "formattedAddress",
                        ],
                    });


                    const placeName =
                        place.displayName;


                    const formattedAddress =
                        place.formattedAddress;


                    if (placeName) {

                        address =
                            formattedAddress
                                ? `${placeName}, ${formattedAddress}`
                                : placeName;

                    } else {

                        address =
                            formattedAddress || "";
                    }
                }



                if (!address) {

                    address =
                        await getAddressFromCoordinates(
                            lat,
                            lng
                        );
                }


            } catch (error) {

                console.error(
                    "Erreur récupération du lieu:",
                    error
                );


                address =
                    await getAddressFromCoordinates(
                        lat,
                        lng
                    );
            }


            onLocationChange({
                latitude: lat,
                longitude: lng,
                address,
            });
        };




    return (
        <Map
            defaultCenter={
                DEFAULT_POSITION
            }
            defaultZoom={13}
            mapId="DEMO_MAP_ID"
            onClick={handleMapClick}
            clickableIcons={true}
            style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
            }}
            gestureHandling="greedy"
        >

            <MapController
                latitude={latitude}
                longitude={longitude}
            />


            {selectedPosition && (
                <AdvancedMarker
                    position={
                        selectedPosition
                    }
                />
            )}

        </Map>
    );
}