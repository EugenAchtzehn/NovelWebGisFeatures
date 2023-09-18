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
    // basemap: "arcgis-topographic" // Basemap layer service
    basemap: 'streets-vector',
    ground: {
      layers: [
        new ElevationLayer({
          url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
        }),
      ],
    },
  });

  // 3D 場景
  const sceneView = new SceneView({
    container: 'viewDiv',
    map: map,
    qualityProfile: 'high',
    camera: {
      position: [121.52, 25, 1000],
      // position: [2.3, 48.8, 1000],
      heading: 0.51,
      tilt: 78.99,
    },
  });

  // const mapView = new MapView({
  //   map: map,
  //   center: [-103.76, 45], // Longitude, latitude
  //   zoom: 4, // Zoom level
  //   container: 'viewDiv', // Div element
  // });

  const featurLayer = new FeatureLayer({
    // URL to the service
    // 美國黃點
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
  });
  map.add(featurLayer);

  const geojsonLayer = new GeoJSONLayer({
    // 美國橘點
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
    copyright: 'USGS Earthquakes',
  });
  map.add(geojsonLayer); // adds the layer to the map

  let sceneLayer = new SceneLayer({
    url: 'https://i3s.nlsc.gov.tw/building/i3s/SceneServer/layers/0?f=pjson',
    definitionExpression: 'BUILD_H > 30',
    // url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer/layers/0',
    // definitionExpression: "Type_Toit = 'plat' AND H_MAX <= 20",
  });
  map.add(sceneLayer);

  let symbol = {
    type: 'mesh-3d', // autocasts as new MeshSymbol3D()
    symbolLayers: [
      {
        type: 'fill', // autocasts as new FillSymbol3DLayer()
        material: { color: [244, 247, 134] },
      },
    ],
  };

  sceneLayer.renderer = {
    type: 'simple', // autocasts as new SimpleRenderer()
    symbol: symbol,
  };

  // let tileLayer = new TileLayer({
  //   url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
  // });
  // map.add(tileLayer);

  // Swipe 目前不支援 SceneView (3D 場景)
  // 另外不支援在 leaderLayers 和 trailingLayers 中的 GroupLayer
  // let swipe = new Swipe({
  //   view: mapView,
  //   leadingLayers: [layer1],
  //   trailingLayers: [geojsonLayer],
  //   direction: 'horizontal', // swipe widget will move from top to bottom of view
  //   position: 50, // position set to middle of the view (50%)
  // });
  // view.ui.add(swipe);
});
