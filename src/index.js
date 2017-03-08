// @flow
import ThreeLib from 'three-js';
import {ResourceManager} from './resource-manager';
import SchoolField from './field/school-field';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let schoolField: SchoolField;

/**
 * コントローラを生成して返す
 *
 * @return コントローラ
 */
function Controllers(): THREE.OrbitControls{
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
  return controls;
}

/**
 * 初期化
 */
function init(): void {
  // リソース管理
  const resourceManager:  ResourceManager = new ResourceManager();
  Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]).then(() => {
    schoolField = new SchoolField(resourceManager.resources);
    schoolField.values().forEach(item => scene.add(item));
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
 * ゲームループ
 */
function animate(): void {
  requestAnimationFrame( animate );

  schoolField.animate(camera);

  renderer.render( scene, camera );
}

(function(){
  init();
  animate();
})();