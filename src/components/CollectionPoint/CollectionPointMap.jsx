import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";

const DEFAULT_POSITION = {
    lat: 32.3373,
    lng: -6.3498,
};

export default function CollectionPointMap({
                                               latitude,
                                               longitude,
                                               onLocationChange,
                                           }) {

    const selectedPosition =
        latitude != null && longitude != null
            ? {
                lat: Number(latitude),
                lng: Number(longitude),
            }
            : null;

    const handleMapClick = (event) => {

        if (!event.detail.latLng) {
            return;
        }

        const { lat, lng } =
            event.detail.latLng;

        onLocationChange({
            latitude: lat,
            longitude: lng,
        });
    };

    return (
        <APIProvider
            apiKey={
                import.meta.env
                    .VITE_GOOGLE_MAPS_API_KEY
            }
        >
            <Map
                defaultCenter={
                    selectedPosition ||
                    DEFAULT_POSITION
                }
                defaultZoom={13}
                mapId="DEMO_MAP_ID"
                onClick={handleMapClick}
                style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                }}
                gestureHandling="greedy"
            >
                {selectedPosition && (
                    <AdvancedMarker
                        position={
                            selectedPosition
                        }
                    />
                )}
            </Map>
        </APIProvider>
    );
}