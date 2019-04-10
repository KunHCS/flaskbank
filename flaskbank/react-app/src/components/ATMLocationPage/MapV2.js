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
      zoom: 14
    });

    let autocomplete;
    let infowindow = new window.google.maps.InfoWindow();
    let myposwindow = new window.google.maps.InfoWindow();
    let service = new window.google.maps.places.PlacesService(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let new_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        myposwindow.setContent("You are here");
        myposwindow.setPosition(new_pos);
        myposwindow.open(map, this);
        map.setCenter(new_pos);
        getNearby(new_pos);
        searchBox();
      });
    } else {
      alert("Browser does not support geolocation");
    }

    function getNearby(pos) {
      let request = {
        location: new window.google.maps.LatLng(pos.lat, pos.lng),
        radius: "4000", //meters
        type: ["bank", "ATM"],
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
      let marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      window.google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    function searchBox() {
      let input = document.getElementById("auto-complete");
      let options = {
        types: ["establishment"]
      };

      autocomplete = new window.google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo("bounds", map);
      autocomplete.setFields(["geometry"]);
      window.google.maps.event.addListener(
        autocomplete,
        "place_changed",
        function() {
          console.log("place changed");
          let place = autocomplete.getPlace();
          let current_pos = place.geometry.location;
          getNearby({ lat: current_pos.lat(), lng: current_pos.lng() });
          map.setCenter(current_pos);
          let myposwindow = new window.google.maps.InfoWindow();
          myposwindow.setContent("You are here");
          myposwindow.setPosition(current_pos);
          myposwindow.open(map, this);
        }
      );
    }
  };

  render() {
    return (
      <main>
        <input
          className="form-control"
          id="auto-complete"
          type="text"
          placeholder="Search"
        />
        <div id="map" />
      </main>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default MapV2;
