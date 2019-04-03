import React, { Component } from "react";

class Map extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0Ihrl2V6nAHzYMxQc_CeJEtd9sW5AA6Q&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: new window.google.maps.LatLng(2.8, -187.3),
      mapTypeId: "terrain"
    });
    // Loop through the results array and place a marker for each
    // set of coordinates.
    // window.eqfeed_callback = function(results) {
    //   for (var i = 0; i < results.features.length; i++) {
    //     var coords = results.features[i].geometry.coordinates;
    //     var latLng = new window.google.maps.LatLng(coords[1], coords[0]);
    //     var marker = new window.google.maps.Marker({
    //       position: latLng,
    //       map: map
    //     });
    //   }
    // };
  };

  render() {
    return <div id="map" />;
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentElement.insertBefore(script, index);
}

export default Map;
