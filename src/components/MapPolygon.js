import React, { Component } from "react";

// let bermudaTriangle = null;

class MapPolygon extends Component {
  state = {
    map: null,
    bermudaTriangle: null
  };

  componentWillMount() {
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
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain"
    });
    this.setState({ map });

    // Define the LatLng coordinates for the polygon's path.
    var triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];

    // Construct the polygon.
    var bermudaTriangle = new window.google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      draggable: true,
      editable: true
    });
    bermudaTriangle.setMap(map);
    bermudaTriangle.addListener("click", () => {
      this.showArrays(bermudaTriangle);
    });
    window.google.maps.event.addListenerOnce(
      map,
      "projection_changed",
      function() {
        console.log(bermudaTriangle);
        // console.log(map.getPath());
        // this.state.
        bermudaTriangle.addListener("click", () => {
          rotatePolygon(bermudaTriangle, 10);
        });
      }
    );
  };

  showArrays = event => {
    console.log("showArrays");
    console.log(event.map);
    console.log("after show Arrays");
    // const infoWindow = new window.google.maps.InfoWindow();
    // // Since this polygon has only one path, we can call getPath() to return the
    // // MVCArray of LatLngs.
    // var vertices = this.getPath();

    // var contentString =
    //   "<b>Bermuda Triangle polygon</b><br>" +
    //   "Clicked location: <br>" +
    //   event.latLng.lat() +
    //   "," +
    //   event.latLng.lng() +
    //   "<br>";

    // // Iterate over the vertices.
    // for (var i = 0; i < vertices.getLength(); i++) {
    //   var xy = vertices.getAt(i);
    //   contentString +=
    //     "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
    // }

    // // Replace the info window's content and position.
    // infoWindow.setContent(contentString);
    // infoWindow.setPosition(event.latLng);

    // infoWindow.open(this.state.map);
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

function rotatePolygon(polygon, angle) {
  // if (polygon === null) return;
  var map = polygon.getMap();
  var prj = map.getProjection();
  // console.log(prj);
  var origin = map
    .getProjection()
    .fromLatLngToPoint(polygon.getPath().getAt(0)); //rotate around first point
  var coords = polygon
    .getPath()
    .getArray()
    .map(function(latLng) {
      var point = prj.fromLatLngToPoint(latLng);
      var rotatedLatLng = prj.fromPointToLatLng(
        rotatePoint(point, origin, angle)
      );
      return { lat: rotatedLatLng.lat(), lng: rotatedLatLng.lng() };
    });
  polygon.setPath(coords);
}

function rotatePoint(point, origin, angle) {
  var angleRad = (angle * Math.PI) / 180.0;
  return {
    x:
      Math.cos(angleRad) * (point.x - origin.x) -
      Math.sin(angleRad) * (point.y - origin.y) +
      origin.x,
    y:
      Math.sin(angleRad) * (point.x - origin.x) +
      Math.cos(angleRad) * (point.y - origin.y) +
      origin.y
  };
}

function createPolygonFromRectangle(rectangle) {
  var map = rectangle.getMap();

  var coords = [
    {
      lat: rectangle
        .getBounds()
        .getNorthEast()
        .lat(),
      lng: rectangle
        .getBounds()
        .getNorthEast()
        .lng()
    },
    {
      lat: rectangle
        .getBounds()
        .getNorthEast()
        .lat(),
      lng: rectangle
        .getBounds()
        .getSouthWest()
        .lng()
    },
    {
      lat: rectangle
        .getBounds()
        .getSouthWest()
        .lat(),
      lng: rectangle
        .getBounds()
        .getSouthWest()
        .lng()
    },
    {
      lat: rectangle
        .getBounds()
        .getSouthWest()
        .lat(),
      lng: rectangle
        .getBounds()
        .getNorthEast()
        .lng()
    }
  ];

  // Construct the polygon.
  var rectPoly = new google.maps.Polygon({
    path: coords
  });
  var properties = [
    "strokeColor",
    "strokeOpacity",
    "strokeWeight",
    "fillOpacity",
    "fillColor"
  ];
  //inherit rectangle properties
  var options = {};
  properties.forEach(function(property) {
    if (rectangle.hasOwnProperty(property)) {
      options[property] = rectangle[property];
    }
  });
  rectPoly.setOptions(options);

  rectangle.setMap(null);
  rectPoly.setMap(map);
  return rectPoly;
}

export default MapPolygon;
