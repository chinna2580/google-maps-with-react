import React, { Component } from "react";
import "./Map.css";
// import { InfoWindow, Marker } from "google-maps-react";

class Map extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  };
  //   constructor() {
  //     super();
  //     this.rotatePolygon = this.rotatePolygon.bind(this);
  //     this.rotatePoint = this.rotatePoint.bind(this);
  //   }
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=drawing&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  showInfoWindow = () => {
    return document.getElementById("content");
  };

  initMap = () => {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The marker, positioned at Uluru
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: uluru,
      zoom: 8
    });
    // new window.google.maps.Marker({ position: uluru, map: map });
    var infowindow = new window.google.maps.InfoWindow({
      content: this.showInfoWindow()
    });

    var marker = new window.google.maps.Marker({
      position: uluru,
      map: map,
      title: "Uluru (Ayers Rock)"
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    var drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
      },
      markerOptions: {
        icon:
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      },
      circleOptions: {
        clickable: true,
        editable: true,
        zIndex: 1,
        draggable: true
      },
      polygonOptions: {
        editable: true,
        draggable: true,
        fixedRotation: false
      },
      reactangleOptions: {
        clickable: true,
        draggable: true,
        fixedRotation: false
      }
    });
    drawingManager.setMap(map);
    drawingManager.addListener("click", this.showArrays);
    // var Popup = createPopupClass();
    // var popup = new Popup(
    //   new window.google.maps.LatLng(-33.866, 151.196),
    //   window.document.getElementById("content")
    // );
    // popup.setMap(map);
    // drawingManager.addListener("click", function(e) {
    //   console.log("drawing manage event");
    //   this.rotatePolygon(drawingManager, 10);
    // });

    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function(event) {
        // console.log(event);
        var shape = null;
        if (event.type === "rectangle") {
          shape = createPolygonFromRectangle(event.overlay);
        } else {
          shape = event.overlay;
        }
        // console.log(shape);
        if (event.type !== "circle" && event.type !== "marker") {
          window.google.maps.event.addListener(shape, "click", function(event) {
            var radius = new window.google.maps.LatLng(
              event.latLng.lat(),
              event.latLng.lng()
            );
            // polygon.getPath().getArray;
            rotatePolygon(shape, radius, 10);
          });
        }
      }
    );
  };

  showArrays = () => {
    console.log("inside show arrays");
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  // rotatePolygon = (polygon, angle) => {
  //   console.log("inside rotate polygon");
  //   var map = polygon.getMap();
  //   var prj = map.getProjection();
  //   var origin = prj.fromLatLngToPoint(polygon.getPath().getAt(0)); //rotate around first point

  //   var coords = polygon
  //     .getPath()
  //     .getArray()
  //     .map(function(latLng) {
  //       var point = prj.fromLatLngToPoint(latLng);
  //       var rotatedLatLng = prj.fromPointToLatLng(
  //         this.rotatePoint(point, origin, angle)
  //       );
  //       return { lat: rotatedLatLng.lat(), lng: rotatedLatLng.lng() };
  //     });
  //   polygon.setPath(coords);
  // };

  // rotatePoint = (point, origin, angle) => {
  //   var angleRad = (angle * Math.PI) / 180.0;
  //   return {
  //     x:
  //       Math.cos(angleRad) * (point.x - origin.x) -
  //       Math.sin(angleRad) * (point.y - origin.y) +
  //       origin.x,
  //     y:
  //       Math.sin(angleRad) * (point.x - origin.x) +
  //       Math.cos(angleRad) * (point.y - origin.y) +
  //       origin.y
  //   };
  // };

  render() {
    return (
      <React.Fragment>
        <button className="btn" id="button1">
          rotate
        </button>
        <div id="map" />
        <div id="content">Hello world! </div>
      </React.Fragment>
    );
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

function rotatePolygon(polygon, radius, angle) {
  var map = polygon.getMap();
  var prj = map.getProjection();
  var origin = prj.fromLatLngToPoint(radius); //rotate around first point

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
  var rectPoly = new window.google.maps.Polygon({
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

function createPopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    console.log("inside popup");
    console.log(position, content);
    this.position = position;

    content.classList.add("popup-bubble");

    // This zero-height div is positioned at the bottom of the bubble.
    var bubbleAnchor = document.createElement("div");
    bubbleAnchor.classList.add("popup-bubble-anchor");
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement("div");
    this.containerDiv.classList.add("popup-container");
    this.containerDiv.appendChild(bubbleAnchor);

    // Optionally stop clicks, etc., from bubbling up to the map.
    window.google.maps.OverlayView.preventMapHitsAndGesturesFrom(
      this.containerDiv
    );
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(window.google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? "block"
        : "none";

    if (display === "block") {
      this.containerDiv.style.left = divPosition.x + "px";
      this.containerDiv.style.top = divPosition.y + "px";
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}

export default Map;

// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
//   url:
//     "https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=drawing"
// })(MapContainer);
