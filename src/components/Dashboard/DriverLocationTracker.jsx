import useDriverLocation from "../../hooks/useDriverLocation.js";

const DriverLocationTracker = ({ driverStatus }) => {

    const shouldTrack =
        driverStatus === "DISPONIBLE" ||
        driverStatus === "EN_LIVRAISON";

    useDriverLocation(shouldTrack);

    return null;
};

export default DriverLocationTracker;