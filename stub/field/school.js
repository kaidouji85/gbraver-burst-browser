// @flow
import ThreeLib from 'three-js';
import {ResourceManager} from '../../src/common/resource-manager';
import SchoolStage from '../../src/stage/kamata';


const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let schoolStage: SchoolStage;

/**
 * リサイズ時の処理
 */
function onWindowResize(): void {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/**
 * 初期化
 */
function init(): void {
  // リソース管理
  const resourceManager:  ResourceManager = new ResourceManager('../../');
  Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]).then(() => {
    schoolStage = new SchoolStage(resourceManager.resources);
    schoolStage.values().forEach(item => scene.add(item));
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
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;

  // 軸
  scene.add(new THREE.AxisHelper(1000));

  // リサイズ時の処理
  window.addEventListener( 'resize', onWindowResize, false );

  document.body.appendChild( renderer.domElement );
}

/**
 * ゲームループ
 */
function animate(): void {
  requestAnimationFrame( animate );

  schoolStage && schoolStage.animate(camera);

  renderer.render( scene, camera );
}

(function(){
  init();
  animate();
})();