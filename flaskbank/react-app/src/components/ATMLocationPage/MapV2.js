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

  initMap = () => {
    let init_pos = { lat: 37.335141, lng: -121.881093 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: init_pos,
      zoom: 15
    });

    let infowindow = new window.google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var new_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let myposwindow = new window.google.maps.InfoWindow();
        myposwindow.setContent("You are here");
        myposwindow.setPosition(new_pos);
        myposwindow.open(map, this);
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
          createMarker(place);
        }
      });
    }

    function createMarker(place) {
      var marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      window.google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
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
