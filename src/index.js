// @flow
import ThreeLib from 'three-js';
import * as CONST from './const';
import {ResourceManager} from './resource-manager';
import SchoolField from './field/school-field';
import ShinBraver from './actors/shin-breaver';
import NeoLandozer from './actors/neo-landozer';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let schoolField: SchoolField = null;
let playerSprite: ShinBraver = null;
let enemySprite: NeoLandozer = null;

/**
 * コントローラを生成して返す
 *
 * @return コントローラ
 */
function Controllers(camera: THREE.Camera, renderer: THREE.WebGLRenderer): THREE.OrbitControls{
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
  camera = new THREE.PerspectiveCamera( 75, CONST.SCREEN_WIDTH / CONST.SCREEN_HEIGHT, 1, 10000 );
  camera.position.z = 1000;

  // レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT );

  // コントローラー
  Controllers(camera, renderer);

  // 軸
  scene.add(new THREE.AxisHelper(1000));

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