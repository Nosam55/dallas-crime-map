/* Dallas-Crime-Map is an interactive map of police
 * data from the Dallas OpenData project intended to make police
 * activity in Dallas County easier to observe. 
 *
 * Copyright 2023 Mason McCully (mmccully2000@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import apiKeys from '../Secrets/APIKeys.json'

function CrimeMap({ height, width, children}) {
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
        <div style={{ margin: "25px", height, width, border: "black solid 2px" }}>
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