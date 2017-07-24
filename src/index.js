// @flow
import ThreeLib from 'three-js';
import {ResourceManager} from './common/resource-manager';
import SchoolStage from './stage/kamata/index';
import ShinBraver from './arndozer/shin-breaver';
import NeoLandozer from './arndozer/neo-landozer';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let schoolField: SchoolStage = null;
let playerSprite: ShinBraver = null;
let enemySprite: NeoLandozer = null;

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
  const resourceManager:  ResourceManager = new ResourceManager();
  Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]).then(() => {
    schoolField = new SchoolStage(resourceManager.resources);
    schoolField.values().forEach(item => scene.add(item));

    playerSprite = new ShinBraver(resourceManager.resources);
    playerSprite.mesh.position.x = 150;
    scene.add(playerSprite.mesh);

    enemySprite = new NeoLandozer(resourceManager.resources);
    enemySprite.mesh.position.x = -150;
    scene.add(enemySprite.mesh);
  });

  // シーン
  scene = new THREE.Scene();

  // カメラ
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 900;
  camera.position.y = 70;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

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

  // TODO 読み込み完了の有無でanimete呼び出しを判定するようにする
  schoolField && schoolField.animate(camera);
  playerSprite && playerSprite.animate(camera);
  enemySprite && enemySprite.animate(camera);

  renderer.render( scene, camera );
}

(function(){
  init();
  animate();
})();