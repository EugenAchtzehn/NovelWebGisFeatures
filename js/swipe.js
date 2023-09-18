// Still the AMD style
require([
  'esri/config',
  'esri/Map',
  'esri/views/MapView',
  'esri/views/SceneView',
  'esri/layers/BaseTileLayer',
  'esri/layers/ElevationLayer',
  'esri/layers/FeatureLayer',
  'esri/layers/GeoJSONLayer',
  'esri/layers/GraphicsLayer',
  'esri/layers/SceneLayer',
  'esri/layers/TileLayer',
  'esri/widgets/Swipe',
], function (
  esriConfig,
  Map,
  MapView,
  SceneView,
  BaseTileLayer,
  ElevationLayer,
  FeatureLayer,
  GeoJSONLayer,
  GraphicsLayer,
  SceneLayer,
  TileLayer,
  Swipe
) {
  const map = new Map({
    // Force developers to apply API Key, but not necessary
    basemap: 'streets-vector',
  });

  const mapView = new MapView({
    map: map,
    center: [-103.76, 45], // Longitude, latitude
    zoom: 4, // Zoom level
    container: 'viewDiv', // Div element
  });

  const featureLayer = new FeatureLayer({
    // URL to the service
    // 美國黃點
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
  });
  map.add(featureLayer);

  const geojsonLayer = new GeoJSONLayer({
    // 美國橘點
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
    copyright: 'USGS Earthquakes',
  });
  map.add(geojsonLayer); // adds the layer to the map

  // let tileLayer = new TileLayer({
  //   url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
  // });
  // map.add(tileLayer);

  // Swipe 目前不支援 SceneView (3D 場景)
  // 另外不支援在 leaderLayers 和 trailingLayers 中的 GroupLayer
  let swipe = new Swipe({
    view: mapView,
    leadingLayers: [featureLayer],
    trailingLayers: [geojsonLayer],
    direction: 'horizontal', // swipe widget will move from top to bottom of view
    position: 50, // position set to middle of the view (50%)
  });
  mapView.ui.add(swipe);
});
