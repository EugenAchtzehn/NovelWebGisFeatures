// Still the AMD style
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/BaseTileLayer",
  "esri/layers/ElevationLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/GeoJSONLayer",
  "esri/layers/GraphicsLayer",
  "esri/layers/SceneLayer",
  "esri/layers/TileLayer",
  "esri/layers/IntegratedMesh3DTilesLayer",
  "esri/widgets/Swipe",
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
  IntegratedMesh3DTilesLayer,
  Swipe
) {
  const map = new Map({
    // Force developers to apply API Key, but not necessary
    // basemap: "arcgis-topographic" // Basemap layer service
    basemap: "streets-vector",
    ground: {
      layers: [
        new ElevationLayer({
          url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        }),
      ],
    },
  });

  // 3D 場景
  const sceneView = new SceneView({
    container: "viewDiv",
    map: map,
    qualityProfile: "high",
    camera: {
      position: [121.56444, 25.01, 1000],
      // position: [2.3, 48.8, 1000],
      heading: 0.51,
      tilt: 80,
    },
  });

  const featurLayer = new FeatureLayer({
    // URL to the service
    // 美國黃點
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
  });
  // map.add(featurLayer);

  const geojsonLayer = new GeoJSONLayer({
    // 美國橘點
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
    copyright: "USGS Earthquakes",
  });
  // map.add(geojsonLayer); // adds the layer to the map

  // Taichung City
  let sceneLayer = new SceneLayer({
    url: "https://i3s.nlsc.gov.tw/building/i3s/SceneServer/layers/0",
    // definitionExpression: "BUILD_H > 30",
    // url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer/layers/0',
    // definitionExpression: "Type_Toit = 'plat' AND H_MAX <= 20",
  });

  // Taipei City
  let threeDTilesLayer = new IntegratedMesh3DTilesLayer({
    url: "https://3dtiles.nlsc.gov.tw/building/tiles3d/0/tileset.json",
  });

  const i3sBtn = document.getElementById("i3s");
  const threeDTilesBtn = document.getElementById("3dtiles");

  i3sBtn.addEventListener("click", () => {
    map.removeAll();
    map.add(sceneLayer);
  });
  threeDTilesBtn.addEventListener("click", () => {
    map.removeAll();
    map.add(threeDTilesLayer);
  });

  // map.remove()

  // let symbol = {
  //   type: "mesh-3d", // autocasts as new MeshSymbol3D()
  //   symbolLayers: [
  //     {
  //       type: "fill", // autocasts as new FillSymbol3DLayer()
  //       material: { color: [244, 247, 134] },
  //     },
  //   ],
  // };

  // sceneLayer.renderer = {
  //   type: "simple", // autocasts as new SimpleRenderer()
  //   symbol: symbol,
  // };
});
