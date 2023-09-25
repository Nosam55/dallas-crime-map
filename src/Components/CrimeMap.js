import React from 'react';
import GoogleMapReact from 'google-map-react';
import apiKeys from '../Secrets/APIKeys.json'

function CrimeMap({ height, width, children }) {
    const defaultProps = {
        center: {
            lat: 32.98570035325772,
            lng: -96.75022851933745
        },
        zoom: 11
    };

    height ??= '33vh';
    width ??= '33%';

    return (
        <div style={{ height, width, border: "black solid 2px" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKeys.GoogleMaps }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {children}
            </GoogleMapReact>
        </div>
    );
}

export default CrimeMap;