import React, { Component } from "react";
import "./mapstyle.css";

export class MapV2 extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDidu8avH7LfiaBboFnGkJDpZXjCMFgsF8&libraries=places&callback=initMap"
    );

    window.initMap = this.initMap;
  };
  //<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
  initMap = () => {
    let init_pos = { lat: 37.335141, lng: -121.881093 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: init_pos,
      zoom: 15
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var new_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(new_pos);
        getNearby(new_pos);
      });
    } else {
      alert("Browser does not support geolocation");
    }

    function getNearby(pos) {
      let service = new window.google.maps.places.PlacesService(map);
      let request = {
        location: new window.google.maps.LatLng(pos.lat, pos.lng),
        radius: "3000",
        type: "bank",
        keyword: "chase+bank+atm"
      };
      service.nearbySearch(request, (result, status) => {
        for (let i = 0; i < result.length; i++) {
          let place = result[i];
          let marker = new window.google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      });
    }
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  console.log(index);
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
  console.log(window.document.getElementsByTagName("script")[0]);
  console.log(window.document.getElementsByTagName("script")[1]);
}

export default MapV2;
