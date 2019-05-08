import React, { Component } from "react";
import "./mapstyle.css";

export class MapV2 extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    //AIzaSyDidu8avH7LfiaBboFnGkJDpZXjCMFgsF8&libraries
    let API_KEY = "AIzaSyDidu8avH7LfiaBboFnGkJDpZXjCMFgsF8&libraries";
    console.log(process.env);
    if (!API_KEY) {
      alert("NO API_KEY SET IN ENVIRONMENT");
      return;
    }
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}=places&callback=initMap`
    );

    window.initMap = this.initMap;
  };

  initMap = () => {
    let init_pos = { lat: 37.335141, lng: -121.881093 };

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: init_pos,
      zoom: 14
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let new_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        getNearby(new_pos);
      });
    } else {
      alert("Browser Does Not Support Geolocation");
    }
    initSearchBox();

    const markerWindow = new window.google.maps.InfoWindow();
    const userWindow = new window.google.maps.InfoWindow();
    const service = new window.google.maps.places.PlacesService(map);

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
        createUserWindow(pos);
      });
    }

    function createUserWindow(pos) {
      map.setCenter(pos);
      userWindow.setContent("Your Starting Location");
      userWindow.setPosition(pos);
      userWindow.open(map, this);
    }
    function createMarker(place) {
      let marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      window.google.maps.event.addListener(marker, "click", function() {
        markerWindow.setContent(place.name);
        markerWindow.open(map, this);
      });
    }

    function initSearchBox() {
      let input = document.getElementById("auto-complete");
      let options = {
        types: ["establishment"]
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        input,
        options
      );
      autocomplete.bindTo("bounds", map);
      autocomplete.setFields(["geometry"]);
      window.google.maps.event.addListener(
        autocomplete,
        "place_changed",
        function() {
          console.log("place changed");
          let place = autocomplete.getPlace();
          let pos = place.geometry.location;
          getNearby({ lat: pos.lat(), lng: pos.lng() });
        }
      );
    }
  };

  render() {
    return (
      <div>
        <input
          className="form-control"
          id="auto-complete"
          type="text"
          placeholder="Search"
        />
        <div id="map" />
      </div>
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
