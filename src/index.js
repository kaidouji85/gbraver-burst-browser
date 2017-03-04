import ThreeLib from 'three-js';
const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene, camera, renderer;
let controls;

/**
 * 校舎モデルを読み込んで返す
 */
function SchoolModel() {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve =>loader.load('/model/school.json', function(geo, mat) {
    let faceMat = new THREE.MeshFaceMaterial(mat);
    let model = new THREE.Mesh(geo, faceMat);
    model.position.set(0, -5, 0);
    model.scale.set(0.1, 0.1, 0.1);
    resolve(model);
  }));
}

/**
 * コントローラを生成して返す
 *
 * @return {object} コントローラ
 */
function Controllers() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
  return controls;
}

/**
 * ライトを生成して返す
 *
 * @return {object[]} ライト
 */
function Light() {
  var directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
  directionalLight.position.set(0, 60, 200);
  var ambientLight = new THREE.AmbientLight(0xFFFFCD);

  return [directionalLight, ambientLight];
}

/**
 * 初期化
 */
function init() {

  // シーン
  scene = new THREE.Scene();

  // カメラ
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  // 校舎物体
  SchoolModel().then(model => scene.add(model));

  // レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // コントローラー
  Controllers();

  // ライト
  Light().forEach(light => scene.add(light));

  document.body.appendChild( renderer.domElement );
}

/**
 * レンダリング
 */
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

(function(){
  init();
  animate();
})();