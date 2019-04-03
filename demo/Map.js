import React, { Component } from "react";
// import ReactDOMServer from "react-dom/server";
import InfoWindowContent from "./InfoWindow";

const googleMaps = window.google;
class Map extends Component {
  state = {
    map: null,
    locations: [
      { lat: 17.56391, lng: 78.154312 },
      { lat: 17.718234, lng: 78.363181 },
      { lat: 17.727111, lng: 78.371124 },
      { lat: 17.848588, lng: 78.209834 },
      { lat: 17.851702, lng: 78.216968 },
      { lat: 17.671264, lng: 78.863657 },
      { lat: 17.304724, lng: 78.662905 },
      { lat: 17.817685, lng: 78.699196 },
      { lat: 17.828611, lng: 78.790222 },
      { lat: 17.75, lng: 78.116667 },
      { lat: 17.759859, lng: 78.128708 },
      { lat: 17.765015, lng: 78.133858 },
      { lat: 17.770104, lng: 78.143299 },
      { lat: 17.7737, lng: 78.145187 },
      { lat: 17.774785, lng: 78.137978 },
      { lat: 17.819616, lng: 78.968119 },
      { lat: 17.330766, lng: 78.695692 },
      { lat: 17.927193, lng: 78.053218 },
      { lat: 17.330162, lng: 78.865694 },
      { lat: 17.734358, lng: 78.439506 },
      { lat: 17.734358, lng: 78.501315 },
      { lat: 17.735258, lng: 78.438 },
      { lat: 17.999792, lng: 78.463352 }
    ]
  };
  componentDidMount() {
    this.initMap();
  }

  enableDrawingManger = () => {
    var drawingManager = new googleMaps.maps.drawing.DrawingManager({
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
    drawingManager.setMap(this.state.map);
    googleMaps.maps.event.addListener(
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

  enableHeatMap = () => {
    const heatmap = new googleMaps.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: this.state.map
    });
  };

  getPoints = () => {
    return [
      new googleMaps.maps.LatLng(17.782551, 78.445368),
      new googleMaps.maps.LatLng(17.782745, 78.444586),
      new googleMaps.maps.LatLng(17.782842, 78.443688),
      new googleMaps.maps.LatLng(17.782919, 78.442815),
      new googleMaps.maps.LatLng(17.782992, 78.442112),
      new googleMaps.maps.LatLng(17.7831, 78.441461),
      new googleMaps.maps.LatLng(17.783206, 78.440829),
      new googleMaps.maps.LatLng(17.783273, 78.440324),
      new googleMaps.maps.LatLng(17.783316, 78.440023),
      new googleMaps.maps.LatLng(17.783357, 78.439794),
      new googleMaps.maps.LatLng(17.783371, 78.439687),
      new googleMaps.maps.LatLng(17.783368, 78.439666),
      new googleMaps.maps.LatLng(17.783383, 78.439594),
      new googleMaps.maps.LatLng(17.783508, 78.439525),
      new googleMaps.maps.LatLng(17.783842, 78.439591),
      new googleMaps.maps.LatLng(17.784147, 78.439668),
      new googleMaps.maps.LatLng(17.784206, 78.439686),
      new googleMaps.maps.LatLng(17.784386, 78.43979),
      new googleMaps.maps.LatLng(17.784701, 78.439902),
      new googleMaps.maps.LatLng(17.784965, 78.439938),
      new googleMaps.maps.LatLng(17.78501, 78.439947),
      new googleMaps.maps.LatLng(17.78536, 78.439952),
      new googleMaps.maps.LatLng(17.785715, 78.44003),
      new googleMaps.maps.LatLng(17.786117, 78.440119),
      new googleMaps.maps.LatLng(17.786564, 78.440209),
      new googleMaps.maps.LatLng(17.786905, 78.44027),
      new googleMaps.maps.LatLng(17.786956, 78.440279),
      new googleMaps.maps.LatLng(17.800224, 78.43352),
      new googleMaps.maps.LatLng(17.800155, 78.434101),
      new googleMaps.maps.LatLng(17.80016, 78.43443),
      new googleMaps.maps.LatLng(17.800378, 78.434527),
      new googleMaps.maps.LatLng(17.800738, 78.434598),
      new googleMaps.maps.LatLng(17.800938, 78.43465),
      new googleMaps.maps.LatLng(17.801024, 78.434889),
      new googleMaps.maps.LatLng(17.800955, 78.435392),
      new googleMaps.maps.LatLng(17.800886, 78.435959),
      new googleMaps.maps.LatLng(17.800811, 78.436275),
      new googleMaps.maps.LatLng(17.800788, 78.436299),
      new googleMaps.maps.LatLng(17.800719, 78.436302),
      new googleMaps.maps.LatLng(17.800702, 78.436298),
      new googleMaps.maps.LatLng(17.800661, 78.436273),
      new googleMaps.maps.LatLng(17.800395, 78.436172),
      new googleMaps.maps.LatLng(17.800228, 78.436116),
      new googleMaps.maps.LatLng(17.800169, 78.43613),
      new googleMaps.maps.LatLng(17.800066, 78.436167),
      new googleMaps.maps.LatLng(17.784345, 78.422922),
      new googleMaps.maps.LatLng(17.784389, 78.422926),
      new googleMaps.maps.LatLng(17.784437, 78.422924),
      new googleMaps.maps.LatLng(17.784746, 78.422818),
      new googleMaps.maps.LatLng(17.785436, 78.422959),
      new googleMaps.maps.LatLng(17.78612, 78.423112),
      new googleMaps.maps.LatLng(17.786433, 78.423029),
      new googleMaps.maps.LatLng(17.786631, 78.421213),
      new googleMaps.maps.LatLng(17.78666, 78.421033),
      new googleMaps.maps.LatLng(17.786801, 78.420141),
      new googleMaps.maps.LatLng(17.786823, 78.420034),
      new googleMaps.maps.LatLng(17.786831, 78.419916),
      new googleMaps.maps.LatLng(17.787034, 78.418208),
      new googleMaps.maps.LatLng(17.787056, 78.418034),
      new googleMaps.maps.LatLng(17.787169, 78.417145),
      new googleMaps.maps.LatLng(17.787217, 78.416715),
      new googleMaps.maps.LatLng(17.786144, 78.416403),
      new googleMaps.maps.LatLng(17.785292, 78.416257),
      new googleMaps.maps.LatLng(17.780666, 78.390374),
      new googleMaps.maps.LatLng(17.780501, 78.391281),
      new googleMaps.maps.LatLng(17.780148, 78.392052),
      new googleMaps.maps.LatLng(17.780173, 78.391148),
      new googleMaps.maps.LatLng(17.780693, 78.390592),
      new googleMaps.maps.LatLng(17.781261, 78.391142),
      new googleMaps.maps.LatLng(17.781808, 78.39173),
      new googleMaps.maps.LatLng(17.78234, 78.392341),
      new googleMaps.maps.LatLng(17.782812, 78.393022),
      new googleMaps.maps.LatLng(17.7833, 78.393672),
      new googleMaps.maps.LatLng(17.783809, 78.394275),
      new googleMaps.maps.LatLng(17.784246, 78.394979),
      new googleMaps.maps.LatLng(17.784791, 78.395958),
      new googleMaps.maps.LatLng(17.785675, 78.396746),
      new googleMaps.maps.LatLng(17.786262, 78.39578),
      new googleMaps.maps.LatLng(17.786776, 78.395093),
      new googleMaps.maps.LatLng(17.787282, 78.394426),
      new googleMaps.maps.LatLng(17.787783, 78.393767),
      new googleMaps.maps.LatLng(17.788343, 78.393184),
      new googleMaps.maps.LatLng(17.788895, 78.392506),
      new googleMaps.maps.LatLng(17.789371, 78.391701),
      new googleMaps.maps.LatLng(17.789722, 78.390952),
      new googleMaps.maps.LatLng(17.790315, 78.390305),
      new googleMaps.maps.LatLng(17.790738, 78.389616),
      new googleMaps.maps.LatLng(17.779448, 78.438702),
      new googleMaps.maps.LatLng(17.779023, 78.438585),
      new googleMaps.maps.LatLng(17.778542, 78.438492),
      new googleMaps.maps.LatLng(17.7781, 78.438411),
      new googleMaps.maps.LatLng(17.777986, 78.438376),
      new googleMaps.maps.LatLng(17.77768, 78.438313),
      new googleMaps.maps.LatLng(17.777316, 78.438273),
      new googleMaps.maps.LatLng(17.777135, 78.438254),
      new googleMaps.maps.LatLng(17.776987, 78.438303),
      new googleMaps.maps.LatLng(17.776946, 78.438404),
      new googleMaps.maps.LatLng(17.776944, 78.438467),
      new googleMaps.maps.LatLng(17.776892, 78.438459),
      new googleMaps.maps.LatLng(17.776842, 78.438442),
      new googleMaps.maps.LatLng(17.776822, 78.438391),
      new googleMaps.maps.LatLng(17.776814, 78.438412),
      new googleMaps.maps.LatLng(17.776787, 78.438628),
      new googleMaps.maps.LatLng(17.776729, 78.43865),
      new googleMaps.maps.LatLng(17.776759, 78.438677),
      new googleMaps.maps.LatLng(17.776772, 78.438498),
      new googleMaps.maps.LatLng(17.776787, 78.438389),
      new googleMaps.maps.LatLng(17.776848, 78.438283),
      new googleMaps.maps.LatLng(17.77687, 78.438239),
      new googleMaps.maps.LatLng(17.777015, 78.438198),
      new googleMaps.maps.LatLng(17.777333, 78.438256),
      new googleMaps.maps.LatLng(17.777595, 78.438308),
      new googleMaps.maps.LatLng(17.777797, 78.438344),
      new googleMaps.maps.LatLng(17.77816, 78.438442),
      new googleMaps.maps.LatLng(17.778414, 78.438508),
      new googleMaps.maps.LatLng(17.778445, 78.438516),
      new googleMaps.maps.LatLng(17.778503, 78.438529),
      new googleMaps.maps.LatLng(17.778607, 78.438549),
      new googleMaps.maps.LatLng(17.77867, 78.438644),
      new googleMaps.maps.LatLng(17.778847, 78.438706),
      new googleMaps.maps.LatLng(17.77924, 78.438744),
      new googleMaps.maps.LatLng(17.779738, 78.438822),
      new googleMaps.maps.LatLng(17.780201, 78.438882),
      new googleMaps.maps.LatLng(17.7804, 78.438905),
      new googleMaps.maps.LatLng(17.780501, 78.438921),
      new googleMaps.maps.LatLng(17.780892, 78.438986),
      new googleMaps.maps.LatLng(17.781446, 78.439087),
      new googleMaps.maps.LatLng(17.781985, 78.439199),
      new googleMaps.maps.LatLng(17.782239, 78.439249),
      new googleMaps.maps.LatLng(17.782286, 78.439266),
      new googleMaps.maps.LatLng(17.797847, 78.429388),
      new googleMaps.maps.LatLng(17.797874, 78.42918),
      new googleMaps.maps.LatLng(17.797885, 78.429069),
      new googleMaps.maps.LatLng(17.797887, 78.42905),
      new googleMaps.maps.LatLng(17.797933, 78.428954),
      new googleMaps.maps.LatLng(17.798242, 78.42899),
      new googleMaps.maps.LatLng(17.798617, 78.429075),
      new googleMaps.maps.LatLng(17.798719, 78.429092),
      new googleMaps.maps.LatLng(17.798944, 78.429145),
      new googleMaps.maps.LatLng(17.79932, 78.429251),
      new googleMaps.maps.LatLng(17.79959, 78.429309),
      new googleMaps.maps.LatLng(17.799677, 78.429324),
      new googleMaps.maps.LatLng(17.799966, 78.42936),
      new googleMaps.maps.LatLng(17.800288, 78.42943),
      new googleMaps.maps.LatLng(17.800443, 78.429461),
      new googleMaps.maps.LatLng(17.800465, 78.429474),
      new googleMaps.maps.LatLng(17.800644, 78.42954),
      new googleMaps.maps.LatLng(17.800948, 78.42962),
      new googleMaps.maps.LatLng(17.801242, 78.429685),
      new googleMaps.maps.LatLng(17.801375, 78.429702),
      new googleMaps.maps.LatLng(17.8014, 78.429703),
      new googleMaps.maps.LatLng(17.801453, 78.429707),
      new googleMaps.maps.LatLng(17.801473, 78.429709),
      new googleMaps.maps.LatLng(17.801532, 78.429707),
      new googleMaps.maps.LatLng(17.801852, 78.429729),
      new googleMaps.maps.LatLng(17.802173, 78.429789),
      new googleMaps.maps.LatLng(17.802459, 78.429847),
      new googleMaps.maps.LatLng(17.802554, 78.429825),
      new googleMaps.maps.LatLng(17.802647, 78.429549),
      new googleMaps.maps.LatLng(17.802693, 78.429179),
      new googleMaps.maps.LatLng(17.802729, 78.428751),
      new googleMaps.maps.LatLng(17.766104, 78.409291),
      new googleMaps.maps.LatLng(17.766103, 78.409268),
      new googleMaps.maps.LatLng(17.766138, 78.409229),
      new googleMaps.maps.LatLng(17.766183, 78.409231),
      new googleMaps.maps.LatLng(17.766153, 78.409276),
      new googleMaps.maps.LatLng(17.766005, 78.409365),
      new googleMaps.maps.LatLng(17.765897, 78.40957),
      new googleMaps.maps.LatLng(17.765767, 78.409739),
      new googleMaps.maps.LatLng(17.765693, 78.410389),
      new googleMaps.maps.LatLng(17.765615, 78.411201),
      new googleMaps.maps.LatLng(17.765533, 78.412121),
      new googleMaps.maps.LatLng(17.765467, 78.412939),
      new googleMaps.maps.LatLng(17.765444, 78.414821),
      new googleMaps.maps.LatLng(17.765444, 78.414964),
      new googleMaps.maps.LatLng(17.765318, 78.415424),
      new googleMaps.maps.LatLng(17.763961, 78.415296),
      new googleMaps.maps.LatLng(17.763115, 78.415196),
      new googleMaps.maps.LatLng(17.762967, 78.415183),
      new googleMaps.maps.LatLng(17.762278, 78.415127),
      new googleMaps.maps.LatLng(17.761675, 78.415055),
      new googleMaps.maps.LatLng(17.760932, 78.414988),
      new googleMaps.maps.LatLng(17.759337, 78.414862),
      new googleMaps.maps.LatLng(17.773187, 78.421922),
      new googleMaps.maps.LatLng(17.773043, 78.422118),
      new googleMaps.maps.LatLng(17.773007, 78.422165),
      new googleMaps.maps.LatLng(17.772979, 78.422219),
      new googleMaps.maps.LatLng(17.772865, 78.422394),
      new googleMaps.maps.LatLng(17.772779, 78.422503),
      new googleMaps.maps.LatLng(17.772676, 78.422701),
      new googleMaps.maps.LatLng(17.772606, 78.422806),
      new googleMaps.maps.LatLng(17.772566, 78.42284),
      new googleMaps.maps.LatLng(17.772508, 78.422852),
      new googleMaps.maps.LatLng(17.772387, 78.423011),
      new googleMaps.maps.LatLng(17.772099, 78.423328),
      new googleMaps.maps.LatLng(17.771704, 78.423783),
      new googleMaps.maps.LatLng(17.771481, 78.424081),
      new googleMaps.maps.LatLng(17.7714, 78.424179),
      new googleMaps.maps.LatLng(17.771352, 78.42422),
      new googleMaps.maps.LatLng(17.771248, 78.424327),
      new googleMaps.maps.LatLng(17.770904, 78.424781),
      new googleMaps.maps.LatLng(17.77052, 78.425283),
      new googleMaps.maps.LatLng(17.770337, 78.425553),
      new googleMaps.maps.LatLng(17.770128, 78.425832),
      new googleMaps.maps.LatLng(17.769756, 78.426331),
      new googleMaps.maps.LatLng(17.7693, 78.426902),
      new googleMaps.maps.LatLng(17.769132, 78.427065),
      new googleMaps.maps.LatLng(17.769092, 78.427103),
      new googleMaps.maps.LatLng(17.768979, 78.427172),
      new googleMaps.maps.LatLng(17.768595, 78.427634),
      new googleMaps.maps.LatLng(17.768372, 78.427913),
      new googleMaps.maps.LatLng(17.768337, 78.427961),
      new googleMaps.maps.LatLng(17.768244, 78.428138),
      new googleMaps.maps.LatLng(17.767942, 78.428581),
      new googleMaps.maps.LatLng(17.767482, 78.429094),
      new googleMaps.maps.LatLng(17.767031, 78.429606),
      new googleMaps.maps.LatLng(17.766732, 78.429986),
      new googleMaps.maps.LatLng(17.76668, 78.430058),
      new googleMaps.maps.LatLng(17.766633, 78.430109),
      new googleMaps.maps.LatLng(17.76658, 78.430211),
      new googleMaps.maps.LatLng(17.766367, 78.430594),
      new googleMaps.maps.LatLng(17.76591, 78.431137),
      new googleMaps.maps.LatLng(17.765353, 78.431806),
      new googleMaps.maps.LatLng(17.764962, 78.432298),
      new googleMaps.maps.LatLng(17.764868, 78.432486),
      new googleMaps.maps.LatLng(17.764518, 78.432913),
      new googleMaps.maps.LatLng(17.763435, 78.434173),
      new googleMaps.maps.LatLng(17.762847, 78.434953),
      new googleMaps.maps.LatLng(17.762291, 78.435935),
      new googleMaps.maps.LatLng(17.762224, 78.436074),
      new googleMaps.maps.LatLng(17.761957, 78.436892),
      new googleMaps.maps.LatLng(17.761652, 78.438886),
      new googleMaps.maps.LatLng(17.761284, 78.439955),
      new googleMaps.maps.LatLng(17.76121, 78.440068),
      new googleMaps.maps.LatLng(17.761064, 78.44072),
      new googleMaps.maps.LatLng(17.76104, 78.441411),
      new googleMaps.maps.LatLng(17.761048, 78.442324),
      new googleMaps.maps.LatLng(17.760851, 78.443118),
      new googleMaps.maps.LatLng(17.759977, 78.444591),
      new googleMaps.maps.LatLng(17.759913, 78.444698),
      new googleMaps.maps.LatLng(17.759623, 78.445065),
      new googleMaps.maps.LatLng(17.758902, 78.445158),
      new googleMaps.maps.LatLng(17.758428, 78.44457),
      new googleMaps.maps.LatLng(17.757687, 78.44334),
      new googleMaps.maps.LatLng(17.757583, 78.44324),
      new googleMaps.maps.LatLng(17.757019, 78.442787),
      new googleMaps.maps.LatLng(17.756603, 78.442322),
      new googleMaps.maps.LatLng(17.75638, 78.441602),
      new googleMaps.maps.LatLng(17.75579, 78.441382),
      new googleMaps.maps.LatLng(17.754493, 78.442133),
      new googleMaps.maps.LatLng(17.754361, 78.442206),
      new googleMaps.maps.LatLng(17.753719, 78.44265),
      new googleMaps.maps.LatLng(17.753096, 78.442915),
      new googleMaps.maps.LatLng(17.751617, 78.443211),
      new googleMaps.maps.LatLng(17.751496, 78.443246),
      new googleMaps.maps.LatLng(17.750733, 78.443428),
      new googleMaps.maps.LatLng(17.750126, 78.443536),
      new googleMaps.maps.LatLng(17.750103, 78.443784),
      new googleMaps.maps.LatLng(17.75039, 78.44401),
      new googleMaps.maps.LatLng(17.750448, 78.444013),
      new googleMaps.maps.LatLng(17.750536, 78.44404),
      new googleMaps.maps.LatLng(17.750493, 78.444141),
      new googleMaps.maps.LatLng(17.790859, 78.402808),
      new googleMaps.maps.LatLng(17.790864, 78.402768),
      new googleMaps.maps.LatLng(17.790995, 78.402539),
      new googleMaps.maps.LatLng(17.791148, 78.402172),
      new googleMaps.maps.LatLng(17.791385, 78.401312),
      new googleMaps.maps.LatLng(17.791405, 78.400776),
      new googleMaps.maps.LatLng(17.791288, 78.400528),
      new googleMaps.maps.LatLng(17.791113, 78.400441),
      new googleMaps.maps.LatLng(17.791027, 78.400395),
      new googleMaps.maps.LatLng(17.791094, 78.400311),
      new googleMaps.maps.LatLng(17.791211, 78.400183),
      new googleMaps.maps.LatLng(17.79106, 78.399334),
      new googleMaps.maps.LatLng(17.790538, 78.398718),
      new googleMaps.maps.LatLng(17.790095, 78.398086),
      new googleMaps.maps.LatLng(17.789644, 78.39736),
      new googleMaps.maps.LatLng(17.789254, 78.396844),
      new googleMaps.maps.LatLng(17.788855, 78.396397),
      new googleMaps.maps.LatLng(17.788483, 78.395963),
      new googleMaps.maps.LatLng(17.788015, 78.395365),
      new googleMaps.maps.LatLng(17.787558, 78.394735),
      new googleMaps.maps.LatLng(17.787472, 78.394323),
      new googleMaps.maps.LatLng(17.78763, 78.394025),
      new googleMaps.maps.LatLng(17.787767, 78.393987),
      new googleMaps.maps.LatLng(17.787486, 78.394452),
      new googleMaps.maps.LatLng(17.786977, 78.395043),
      new googleMaps.maps.LatLng(17.786583, 78.395552),
      new googleMaps.maps.LatLng(17.78654, 78.39561),
      new googleMaps.maps.LatLng(17.786516, 78.395659),
      new googleMaps.maps.LatLng(17.786378, 78.395707),
      new googleMaps.maps.LatLng(17.786044, 78.395362),
      new googleMaps.maps.LatLng(17.785598, 78.394715),
      new googleMaps.maps.LatLng(17.785321, 78.394361),
      new googleMaps.maps.LatLng(17.785207, 78.394236),
      new googleMaps.maps.LatLng(17.785751, 78.394062),
      new googleMaps.maps.LatLng(17.785996, 78.393881),
      new googleMaps.maps.LatLng(17.786092, 78.39383),
      new googleMaps.maps.LatLng(17.785998, 78.393899),
      new googleMaps.maps.LatLng(17.785114, 78.394365),
      new googleMaps.maps.LatLng(17.785022, 78.394441),
      new googleMaps.maps.LatLng(17.784823, 78.394635),
      new googleMaps.maps.LatLng(17.784719, 78.394629),
      new googleMaps.maps.LatLng(17.785069, 78.394176),
      new googleMaps.maps.LatLng(17.7855, 78.39365),
      new googleMaps.maps.LatLng(17.78577, 78.393291),
      new googleMaps.maps.LatLng(17.785839, 78.393159),
      new googleMaps.maps.LatLng(17.782651, 78.400628),
      new googleMaps.maps.LatLng(17.782616, 78.400599),
      new googleMaps.maps.LatLng(17.782702, 78.40047),
      new googleMaps.maps.LatLng(17.782915, 78.400192),
      new googleMaps.maps.LatLng(17.783137, 78.399887),
      new googleMaps.maps.LatLng(17.783414, 78.399519),
      new googleMaps.maps.LatLng(17.783629, 78.399237),
      new googleMaps.maps.LatLng(17.783688, 78.399157),
      new googleMaps.maps.LatLng(17.783716, 78.399106),
      new googleMaps.maps.LatLng(17.783798, 78.399072),
      new googleMaps.maps.LatLng(17.783997, 78.399186),
      new googleMaps.maps.LatLng(17.784271, 78.399538),
      new googleMaps.maps.LatLng(17.784577, 78.399948),
      new googleMaps.maps.LatLng(17.784828, 78.40026),
      new googleMaps.maps.LatLng(17.784999, 78.400477),
      new googleMaps.maps.LatLng(17.785113, 78.400651),
      new googleMaps.maps.LatLng(17.785155, 78.400703),
      new googleMaps.maps.LatLng(17.785192, 78.400749),
      new googleMaps.maps.LatLng(17.785278, 78.400839),
      new googleMaps.maps.LatLng(17.785387, 78.400857),
      new googleMaps.maps.LatLng(17.785478, 78.40089),
      new googleMaps.maps.LatLng(17.785526, 78.401022),
      new googleMaps.maps.LatLng(17.785598, 78.401148),
      new googleMaps.maps.LatLng(17.785631, 78.401202),
      new googleMaps.maps.LatLng(17.78566, 78.401267),
      new googleMaps.maps.LatLng(17.803986, 78.426035),
      new googleMaps.maps.LatLng(17.804102, 78.425089),
      new googleMaps.maps.LatLng(17.804211, 78.424156),
      new googleMaps.maps.LatLng(17.803861, 78.423385),
      new googleMaps.maps.LatLng(17.803151, 78.423214),
      new googleMaps.maps.LatLng(17.802439, 78.423077),
      new googleMaps.maps.LatLng(17.80174, 78.422905),
      new googleMaps.maps.LatLng(17.801069, 78.422785),
      new googleMaps.maps.LatLng(17.800345, 78.422649),
      new googleMaps.maps.LatLng(17.799633, 78.422603),
      new googleMaps.maps.LatLng(17.79975, 78.4217),
      new googleMaps.maps.LatLng(17.799885, 78.420854),
      new googleMaps.maps.LatLng(17.799209, 78.420607),
      new googleMaps.maps.LatLng(17.795656, 78.400395),
      new googleMaps.maps.LatLng(17.795203, 78.400304),
      new googleMaps.maps.LatLng(17.778738, 78.415584),
      new googleMaps.maps.LatLng(17.778812, 78.415189),
      new googleMaps.maps.LatLng(17.778824, 78.415092),
      new googleMaps.maps.LatLng(17.778833, 78.414932),
      new googleMaps.maps.LatLng(17.778834, 78.414898),
      new googleMaps.maps.LatLng(17.77874, 78.414757),
      new googleMaps.maps.LatLng(17.778501, 78.414433),
      new googleMaps.maps.LatLng(17.778182, 78.414026),
      new googleMaps.maps.LatLng(17.777851, 78.413623),
      new googleMaps.maps.LatLng(17.777486, 78.413166),
      new googleMaps.maps.LatLng(17.777109, 78.412674),
      new googleMaps.maps.LatLng(17.776743, 78.412186),
      new googleMaps.maps.LatLng(17.77644, 78.4118),
      new googleMaps.maps.LatLng(17.776295, 78.411614),
      new googleMaps.maps.LatLng(17.776158, 78.41144),
      new googleMaps.maps.LatLng(17.775806, 78.410997),
      new googleMaps.maps.LatLng(17.775422, 78.410484),
      new googleMaps.maps.LatLng(17.775126, 78.410087),
      new googleMaps.maps.LatLng(17.775012, 78.409854),
      new googleMaps.maps.LatLng(17.775164, 78.409573),
      new googleMaps.maps.LatLng(17.775498, 78.40918),
      new googleMaps.maps.LatLng(17.775868, 78.40873),
      new googleMaps.maps.LatLng(17.776256, 78.40824),
      new googleMaps.maps.LatLng(17.776519, 78.407928),
      new googleMaps.maps.LatLng(17.776539, 78.407904),
      new googleMaps.maps.LatLng(17.776595, 78.407854),
      new googleMaps.maps.LatLng(17.776853, 78.407547),
      new googleMaps.maps.LatLng(17.777234, 78.407087),
      new googleMaps.maps.LatLng(17.777644, 78.406558),
      new googleMaps.maps.LatLng(17.778066, 78.406017),
      new googleMaps.maps.LatLng(17.778468, 78.405499),
      new googleMaps.maps.LatLng(17.778866, 78.404995),
      new googleMaps.maps.LatLng(17.779295, 78.404455),
      new googleMaps.maps.LatLng(17.779695, 78.40395),
      new googleMaps.maps.LatLng(17.779982, 78.403584),
      new googleMaps.maps.LatLng(17.780295, 78.403223),
      new googleMaps.maps.LatLng(17.780664, 78.402766),
      new googleMaps.maps.LatLng(17.781043, 78.402288),
      new googleMaps.maps.LatLng(17.781399, 78.401823),
      new googleMaps.maps.LatLng(17.781727, 78.401407),
      new googleMaps.maps.LatLng(17.781853, 78.401247),
      new googleMaps.maps.LatLng(17.781894, 78.401195),
      new googleMaps.maps.LatLng(17.782076, 78.400977),
      new googleMaps.maps.LatLng(17.782338, 78.400603),
      new googleMaps.maps.LatLng(17.782666, 78.400133),
      new googleMaps.maps.LatLng(17.783048, 78.399634),
      new googleMaps.maps.LatLng(17.78345, 78.399198),
      new googleMaps.maps.LatLng(17.783791, 78.398998),
      new googleMaps.maps.LatLng(17.784177, 78.398959),
      new googleMaps.maps.LatLng(17.784388, 78.398971),
      new googleMaps.maps.LatLng(17.784404, 78.399128),
      new googleMaps.maps.LatLng(17.784586, 78.399524),
      new googleMaps.maps.LatLng(17.784835, 78.399927),
      new googleMaps.maps.LatLng(17.785116, 78.400307),
      new googleMaps.maps.LatLng(17.785282, 78.400539),
      new googleMaps.maps.LatLng(17.785346, 78.400692),
      new googleMaps.maps.LatLng(17.765769, 78.407201),
      new googleMaps.maps.LatLng(17.76579, 78.407414),
      new googleMaps.maps.LatLng(17.765802, 78.407755),
      new googleMaps.maps.LatLng(17.765791, 78.408219),
      new googleMaps.maps.LatLng(17.765763, 78.408759),
      new googleMaps.maps.LatLng(17.765726, 78.409348),
      new googleMaps.maps.LatLng(17.765716, 78.409882),
      new googleMaps.maps.LatLng(17.765708, 78.410202),
      new googleMaps.maps.LatLng(17.765705, 78.410253),
      new googleMaps.maps.LatLng(17.765707, 78.410369),
      new googleMaps.maps.LatLng(17.765692, 78.41072),
      new googleMaps.maps.LatLng(17.765699, 78.411215),
      new googleMaps.maps.LatLng(17.765687, 78.411789),
      new googleMaps.maps.LatLng(17.765666, 78.412373),
      new googleMaps.maps.LatLng(17.765598, 78.412883),
      new googleMaps.maps.LatLng(17.765543, 78.413039),
      new googleMaps.maps.LatLng(17.765532, 78.413125),
      new googleMaps.maps.LatLng(17.7655, 78.413553),
      new googleMaps.maps.LatLng(17.765448, 78.414053),
      new googleMaps.maps.LatLng(17.765388, 78.414645),
      new googleMaps.maps.LatLng(17.765323, 78.41525),
      new googleMaps.maps.LatLng(17.765303, 78.415847),
      new googleMaps.maps.LatLng(17.765251, 78.416439),
      new googleMaps.maps.LatLng(17.765204, 78.41702),
      new googleMaps.maps.LatLng(17.765172, 78.417556),
      new googleMaps.maps.LatLng(17.765164, 78.418075),
      new googleMaps.maps.LatLng(17.765153, 78.418618),
      new googleMaps.maps.LatLng(17.765136, 78.419112),
      new googleMaps.maps.LatLng(17.765129, 78.419378),
      new googleMaps.maps.LatLng(17.765119, 78.419481),
      new googleMaps.maps.LatLng(17.7651, 78.419852),
      new googleMaps.maps.LatLng(17.765083, 78.420349),
      new googleMaps.maps.LatLng(17.765045, 78.42093),
      new googleMaps.maps.LatLng(17.764992, 78.421481),
      new googleMaps.maps.LatLng(17.76498, 78.421695),
      new googleMaps.maps.LatLng(17.764993, 78.421843),
      new googleMaps.maps.LatLng(17.764986, 78.422255),
      new googleMaps.maps.LatLng(17.764975, 78.422823),
      new googleMaps.maps.LatLng(17.764939, 78.423411),
      new googleMaps.maps.LatLng(17.764902, 78.424014),
      new googleMaps.maps.LatLng(17.764853, 78.424576),
      new googleMaps.maps.LatLng(17.764826, 78.424922),
      new googleMaps.maps.LatLng(17.764796, 78.425375),
      new googleMaps.maps.LatLng(17.764782, 78.425869),
      new googleMaps.maps.LatLng(17.764768, 78.426089),
      new googleMaps.maps.LatLng(17.764766, 78.426117),
      new googleMaps.maps.LatLng(17.764723, 78.426276),
      new googleMaps.maps.LatLng(17.764681, 78.426649),
      new googleMaps.maps.LatLng(17.782012, 78.4042),
      new googleMaps.maps.LatLng(17.781574, 78.404911),
      new googleMaps.maps.LatLng(17.781055, 78.405597),
      new googleMaps.maps.LatLng(17.780479, 78.406341),
      new googleMaps.maps.LatLng(17.779996, 78.406939),
      new googleMaps.maps.LatLng(17.779459, 78.407613),
      new googleMaps.maps.LatLng(17.778953, 78.408228),
      new googleMaps.maps.LatLng(17.778409, 78.408839),
      new googleMaps.maps.LatLng(17.777842, 78.409501),
      new googleMaps.maps.LatLng(17.777334, 78.410181),
      new googleMaps.maps.LatLng(17.776809, 78.410836),
      new googleMaps.maps.LatLng(17.77624, 78.411514),
      new googleMaps.maps.LatLng(17.775725, 78.412145),
      new googleMaps.maps.LatLng(17.77519, 78.412805),
      new googleMaps.maps.LatLng(17.774672, 78.413464),
      new googleMaps.maps.LatLng(17.774084, 78.414186),
      new googleMaps.maps.LatLng(17.773533, 78.413636),
      new googleMaps.maps.LatLng(17.773021, 78.413009),
      new googleMaps.maps.LatLng(17.772501, 78.412371),
      new googleMaps.maps.LatLng(17.771964, 78.411681),
      new googleMaps.maps.LatLng(17.771479, 78.411078),
      new googleMaps.maps.LatLng(17.770992, 78.410477),
      new googleMaps.maps.LatLng(17.770467, 78.409801),
      new googleMaps.maps.LatLng(17.77009, 78.408904),
      new googleMaps.maps.LatLng(17.769657, 78.408103),
      new googleMaps.maps.LatLng(17.769132, 78.407276),
      new googleMaps.maps.LatLng(17.768564, 78.406469),
      new googleMaps.maps.LatLng(17.76798, 78.405745),
      new googleMaps.maps.LatLng(17.76738, 78.405299),
      new googleMaps.maps.LatLng(17.766604, 78.405297),
      new googleMaps.maps.LatLng(17.765838, 78.4052),
      new googleMaps.maps.LatLng(17.765139, 78.405139),
      new googleMaps.maps.LatLng(17.764457, 78.405094),
      new googleMaps.maps.LatLng(17.763716, 78.405142),
      new googleMaps.maps.LatLng(17.762932, 78.405398),
      new googleMaps.maps.LatLng(17.762126, 78.405813),
      new googleMaps.maps.LatLng(17.761344, 78.406215),
      new googleMaps.maps.LatLng(17.760556, 78.406495),
      new googleMaps.maps.LatLng(17.759732, 78.406484),
      new googleMaps.maps.LatLng(17.75891, 78.406228),
      new googleMaps.maps.LatLng(17.758182, 78.405695),
      new googleMaps.maps.LatLng(17.757676, 78.405118),
      new googleMaps.maps.LatLng(17.757039, 78.404346),
      new googleMaps.maps.LatLng(17.756335, 78.403719),
      new googleMaps.maps.LatLng(17.755503, 78.403406),
      new googleMaps.maps.LatLng(17.754665, 78.403242),
      new googleMaps.maps.LatLng(17.753837, 78.403172),
      new googleMaps.maps.LatLng(17.752986, 78.403112),
      new googleMaps.maps.LatLng(17.751266, 78.403355)
    ];
  };

  initMap = () => {
    var positions = { lat: 17.4172299, lng: 78.40127489999999 };
    const map = new googleMaps.maps.Map(document.getElementById("map"), {
      center: positions, //{ lat: -34.397, lng: 150.644 },
      zoom: 8
    });
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var markers = this.state.locations.map(function(location, i) {
      var marker = new window.google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });
      return marker;
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new window.MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });
    var infoWindow = new googleMaps.maps.InfoWindow();
    // Try HTML5 geolocation.
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          positions = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setPosition(positions);
          //   console.log(InfoWindowContent);
          const content = document.getElementById("content");
          infoWindow.setContent(content);
          //   infoWindow.open(map);
          var marker = new googleMaps.maps.Marker({
            position: positions,
            map: map
          });
          marker.addListener("click", function() {
            infoWindow.open(map, marker);
          });
          map.setCenter(positions);
        },
        function() {
          this.handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      this.setState({ map });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
      this.setState({ map });
    }
  };

  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    const { map } = this.state;
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  //   initMap = () => {
  //     const googleMaps = window.google.maps;

  //     //Below is the snipper for showing simple map
  //     var map = new googleMaps.Map(document.getElementById("map"), {
  //       zoom: 3,
  //       center: { lat: -28.024, lng: 140.887 }
  //     });
  //   };
  render() {
    return (
      <React.Fragment>
        <button className="" onClick={this.enableDrawingManger}>
          draw
        </button>
        <button className="" onClick={this.enableHeatMap}>
          Heatmap
        </button>
        <div id="map" />
        <InfoWindowContent />
      </React.Fragment>
    );
  }
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
export default Map;
