import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor() {
        super()

        this.state = {
            center:[0, 0],
            zoom: 14,
        };
        this.getMyLocation = this.getMyLocation.bind(this)
    }


    componentDidMount(){
        this.getMyLocation();
    }
    getMyLocation() {
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
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <Button onClick={this.getMyLocation()}>Get current location</Button>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyA0WRCYbwOJlu78I0uwsOuj54l8X9RIJqw' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >

                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;