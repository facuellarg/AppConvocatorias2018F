import React from 'react';

import ReactStreetview from 'react-streetview';


export class Maps extends React.Component {

    render() {



        // see https://developers.google.com/maps/documentation/javascript
        const googleMapsApiKey = 'AIzaSyDE67xEnOf5yV2_5KSsCxhsAJhyEcqcYwM';

        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
        const streetViewPanoramaOptions = {
            position: {lat: 4.638451356484373, lng: -74.08471591322609},
            pov: {heading: 100, pitch: 0},
            zoom: 0,

        };

        return (
            <div style={{
                height: '130px'
                //backgroundColor: '#eeeeee'
            }}>
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
        );
    }
}


