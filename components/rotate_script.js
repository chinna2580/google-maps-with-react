var map;
var circle, polygon, a;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
    },
    markerOptions: {
      icon:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    },
    circleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    },
    polygonOptions: {
      clickable: false,
      editable: true,
      draggable: true
    },
    polylineOptions: {
      clickable: false,
      editable: true,
      draggable: true
    },
    rectangleOptions: {
      clickable: false,
      editable: true,
      draggable: true
    },
    markerOptions: {
      clickable: false,
      editable: true,
      draggable: true
    }
  });

  drawingManager.setMap(map);
  google.maps.event.addListener(drawingManager, "overlaycomplete", function(
    event
  ) {
    onCircleComplete(event);
    // debugger
    if (polygon != null) {
      google.maps.event.addListener(polygon, "click", function(event) {
        radius = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        polygon.getPath().getArray;
        rotatePolygon(radius, 10);
      });
    }
  });
}
function onCircleComplete(event) {
  if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
    if (circle != null) {
      circle.setMap(null);
      circle = null;
    }
    circle = event.overlay;
  } else if (
    event.type == google.maps.drawing.OverlayType.POLYLINE ||
    event.type == google.maps.drawing.OverlayType.POLYGON
  ) {
    if (polygon != null) {
      polygon.setMap(null);
      polygon = null;
    }
    polygon = event.overlay;
    console.log(
      polygon
        .getPath()
        .getArray()
        .toString()
    );
  } else return;
}
function rotatePolygon(radius, angle) {
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
