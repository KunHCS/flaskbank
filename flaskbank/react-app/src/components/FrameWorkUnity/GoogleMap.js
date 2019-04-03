import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Button from '@material-ui/core/Button';

const style = {
    width: '65%',
    height: '80%'
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        if (!props.hasOwnProperty('google')) {
            throw new Error('You must include a `google` prop');
        }
        this.state = {
            center:[37.335186, -121.881073],
            zoom: 15,
            open: false,
        };
        this.getMyLocation = this.getMyLocation.bind(this)
    }
    getMyLocation() {
        this.setState({open: true})
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                });
            }, (error) => {
                this.setState({center: [ 'err-latitude', 'err-longitude' ],});
            })
        }

    }
    render() {
        return (
            <div>
                <Button onClick={this.getMyLocation}>Get current location</Button>
                <Map
                    google={this.props.google}
                    onReady={this.fetchPlaces}
                    visible={this.state.open}
                    style={style}
                    center={{
                        lat: this.state.center[0],
                        lng: this.state.center[1]
                    }}
                    zoom={15}
                >
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'CurrentLocation'}
                        position={{lat: this.state.center[0], lng: this.state.center[1]}}
                    />

                    {/*<InfoWindow onClose={this.onInfoWindowClose}>*/}
                    {/*<div>*/}
                    {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                    {/*</div>*/}
                    {/*</InfoWindow>*/}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw"),
})(MapContainer)