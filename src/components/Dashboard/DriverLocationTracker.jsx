import useDriverLocation from "../../hooks/useDriverLocation.js";

const DriverLocationTracker = ({ driverStatus }) => {

    const shouldTrack =
        driverStatus === "DISPONIBLE" ||
        driverStatus === "EN_ATTENTE_ACCEPTATION" ||
        driverStatus === "EN_LIVRAISON";

    useDriverLocation(shouldTrack);

    return null;
};

export default DriverLocationTracker;