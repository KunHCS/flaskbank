import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Button from '@material-ui/core/Button';
import {AxiosInstance as axios} from "axios";

const style = {
    width: '65%',
    height: '80%'
};
const GET_NEAREST_ATM = 'GET_NEAREST_ATM'

//const url = `${"https://maps.googleapis.com/maps/api/place/nearbysearch/json"}?location=${this.state.center[0]},${this.state.center[1]}&radius=1000&type=bank&keyword=chase+bank+atm&key=${"AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw"}`;

const googleUrlToLatLng = require('google-geocoder');

const geo = googleUrlToLatLng({
    key: 'AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw'
});
const groupMarkers = [];
// const getAllNearLocation = (props) =>{
//     geo.find(url, function(err, res){
//         if (err) {
//             console.error(err);
//         } else {
//             const position = res[0].add;
//             groupMarkers.push(position);
//         }});
//     this.setState({
//         markersLoaded: true,
//     });
//     console.log(groupMarkers.toString());
// }


// const geo = geocoderInstance({
//     key: "AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw",
// });
// const findChaseBankATM = {
//     Geocode.setApiKey("AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw");
// Geocode.enableDebug();
//
// Geocode.fromAddress("Eiffel Tower").then(
//     response => {
//         const { lat, lng } = response.results[0].geometry.location;
//         console.log(lat, lng);
//     },
//     error => {
//         console.error(error);
//     }
// );
// }
class MapContainer extends Component {
    state = {
        center: [37.335186, -121.881073],
        zoom: 15,
        mapOpen: false,
        markers: [],
        markersLoaded: false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        windowOpen: false,
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };
    // windowHasOpened = (props) => {
    //     this.setState({windowOpen: true})
    // }

    getMyLocation = (props) => {
        this.setState({mapOpen: true});
        const location = window.navigator && window.navigator.geolocation;
        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                });
            }, (error) => {
                this.setState({center: ['err-latitude', 'err-longitude'],});
            })
        }
    };
    // gotNearestATMsLocation = (atm) => {
    //     return {
    //         type: GET_NEAREST_ATM,
    //         atm
    //     }
    // }
    getNearestATMsLocation = () => {
        const url = `${"https://maps.googleapis.com/maps/api/place/nearbysearch/json"}?location=${this.state.center[0]},${this.state.center[1]}&radius=1000&type=bank&keyword=chase+bank+atm&key=${"AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw"}`

        axios.get(url)
            .then(response => {
                response.data.results.map((atm) => {
                    this.state.markers.push(atm.geometry.location);
                })


            .catch(error => console.log(error.response))
        alert(this.state.markers.forEach((e) => e.toString()))
    }

    // nearestATMsLocations(){
    //     let add = this.address
    //     geo.find(add, (err, res) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             const position = res[0].add;
    //             groupMarkers.push(position);
    //         }})
    //     this.setState({
    //         markersLoaded: true,
    //     })
    //     console.log(groupMarkers.toString())
    // }
    // geocodeAddress(address) {
    //     this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
    //
    //         if (status === google.maps.GeocoderStatus.OK) {
    //             this.map.setCenter(results[0].geometry.location);
    //             this.marker.setPosition(results[0].geometry.location);
    //
    //             return;
    //         }
    //
    //         this.map.setCenter({
    //             lat: ATLANTIC_OCEAN.latitude,
    //             lng: ATLANTIC_OCEAN.longitude
    //         });
    //
    //         this.marker.setPosition({
    //             lat: ATLANTIC_OCEAN.latitude,
    //             lng: ATLANTIC_OCEAN.longitude
    //         });
    //
    //     }.bind(this));
    // }
    render() {
        return (
            <div>
                <Button onClick={this.getMyLocation}>Get current location</Button>
                {/*<Button onClick={getAllNearLocation}>Test</Button>*/}
                <Button onClick={this.getNearestATMsLocation}>Find nearest Chase Bank ATM</Button>
                <Button onClick={this.getTesting}>Try</Button>
                <Map
                    visible={this.state.open}
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    //onReady={this.fetchPlaces}
                    style={style}
                    center={{
                        lat: this.state.center[0],
                        lng: this.state.center[1]
                    }}
                    zoom={15}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'CurrentLocation'}
                        position={{lat: this.state.center[0], lng: this.state.center[1]}}
                    />

                    <InfoWindow
                        // onOpen={this.windowHasOpened}
                        // onClose={this.windowHasClosed}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw"),
})(MapContainer)