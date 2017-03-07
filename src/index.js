import ThreeLib from 'three-js';
import {ResourceManager} from './resource-manager';
import SchoolField from './field/school-field';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene, camera, renderer;

/**
 * コントローラを生成して返す
 *
 * @return {object} コントローラ
 */
function Controllers() {
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
  return controls;
}

/**
 * 初期化
 */
function init() {
  // リソース管理
  const resourceManager = new ResourceManager();
  Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]).then(() => {
    SchoolField(resourceManager.resources).forEach(item => scene.add(item));
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