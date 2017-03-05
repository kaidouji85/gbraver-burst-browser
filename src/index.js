import ThreeLib from 'three-js';
import ResourceManager from './resource-manager';
import {School} from './models';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene, camera, renderer;
let controls;

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
  // リソース管理
  const resourceManager = new ResourceManager();
  resourceManager.loadModels().then(() => {
    scene.add(School(resourceManager.resources));
  });

  // シーン
  scene = new THREE.Scene();

  // カメラ
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

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