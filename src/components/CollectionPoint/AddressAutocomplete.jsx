import {
    useEffect,
    useRef,
} from "react";

import {
    TextField,
} from "@mui/material";

import {
    useMapsLibrary,
} from "@vis.gl/react-google-maps";


export default function AddressAutocomplete({
                                                value,
                                                onChange,
                                                onPlaceSelect,
                                            }) {

    const places =
        useMapsLibrary("places");

    const geocoding =
        useMapsLibrary("geocoding");

    const inputRef =
        useRef(null);

    const autocompleteRef =
        useRef(null);




    useEffect(() => {

        if (
            !places ||
            !inputRef.current
        ) {
            return;
        }


        const autocomplete =
            new places.Autocomplete(
                inputRef.current,
                {
                    fields: [
                        "formatted_address",
                        "geometry",
                        "name",
                    ],

                    componentRestrictions: {
                        country: "ma",
                    },
                }
            );


        autocompleteRef.current =
            autocomplete;


        const listener =
            autocomplete.addListener(
                "place_changed",
                () => {

                    const place =
                        autocomplete.getPlace();


                    if (
                        !place.geometry?.location
                    ) {
                        return;
                    }


                    onPlaceSelect({
                        address:
                            place.formatted_address ||
                            place.name ||
                            value,

                        latitude:
                            place.geometry.location.lat(),

                        longitude:
                            place.geometry.location.lng(),
                    });
                }
            );


        return () => {
            listener.remove();
        };

    }, [
        places,
        onPlaceSelect,
        value,
    ]);




    const handleKeyDown =
        async (event) => {

            if (
                event.key !== "Enter"
            ) {
                return;
            }


            event.preventDefault();


            if (
                !value.trim() ||
                !geocoding
            ) {
                return;
            }


            try {

                const geocoder =
                    new geocoding.Geocoder();


                const response =
                    await geocoder.geocode({
                        address: value.trim(),

                        componentRestrictions: {
                            country: "MA",
                        },
                    });


                if (
                    !response.results ||
                    response.results.length === 0
                ) {
                    return;
                }


                const result =
                    response.results[0];


                const location =
                    result.geometry.location;


                onPlaceSelect({
                    address:
                    result.formatted_address,

                    latitude:
                        location.lat(),

                    longitude:
                        location.lng(),
                });

            } catch (error) {

                console.error(
                    "Erreur recherche adresse:",
                    error
                );
            }
        };




    return (
        <TextField
            label="Adresse"
            placeholder="Ex: Avenue Mohammed V, Beni Mellal"
            fullWidth

            value={value}

            inputRef={
                inputRef
            }

            onChange={(event) =>
                onChange(
                    event.target.value
                )
            }

            onKeyDown={
                handleKeyDown
            }

            helperText="Sélectionnez une suggestion Google ou appuyez sur Entrée"
        />
    );
}