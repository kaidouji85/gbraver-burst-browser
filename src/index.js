// @flow
import ThreeLib from 'three-js';
import Tween from 'tween.js';
import {ResourceManager} from './common/resource-manager';
import BattleFieldLayer from './layer/battle-field';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/** バトルフィールドレイヤー */
let battleField: BattleFieldLayer = null;

/** レンダラー */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
renderer.setSize( window.innerWidth, window.innerHeight );

/** HUDシーン関連 */
const width = window.innerWidth;
const height = window.innerHeight;
const hudCanvas = document.createElement('canvas');
hudCanvas.width = width;
hudCanvas.height = height;

const hudBitmap = hudCanvas.getContext('2d');
hudBitmap.font = "Normal 40px Arial";
hudBitmap.textAlign = 'center';
hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
hudBitmap.fillText('Initializing...', width / 2, height / 2);

const cameraHUD = new THREE.OrthographicCamera(
  -width/2, width/2,
  height/2, -height/2,
  0, 30
);

const sceneHUD = new THREE.Scene();

const hudTexture = new THREE.Texture(hudCanvas)
hudTexture.needsUpdate = true;

const material = new THREE.MeshBasicMaterial( {map: hudTexture } );
material.transparent = true;

var planeGeometry = new THREE.PlaneGeometry( width, height );
var plane = new THREE.Mesh( planeGeometry, material );
sceneHUD.add( plane );

/** リソースマネージャ */
const resourceManager:  ResourceManager = new ResourceManager();
window.addEventListener( 'resize', onWindowResize, false );
document.body.appendChild( renderer.domElement );

/**
 * リサイズ時の処理
 */
function onWindowResize(): void {
  renderer.setSize( window.innerWidth, window.innerHeight );
  //camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix();
}

/**
 * ゲームループ
 */
function animate(time: double): void {
  requestAnimationFrame( animate );

  Tween.update(time);

  battleField.animate();
  renderer.render( battleField.scene, battleField.camera );

  hudBitmap.clearRect(0, 0, width, height);
  hudBitmap.fillText('Initializing...', width / 2, height / 2);
  renderer.render( sceneHUD, cameraHUD );
}

/**
 * プレイヤーキャラがパンチする
 */
function punchPlayer() {
  console.log('punch!!');
  battleField.playerSprite.tween.stop();
  battleField.playerSprite.tween.start();
}

(async function(){
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]);

  battleField = new BattleFieldLayer({resources: resourceManager.resources});
  battleField.scene.add(new THREE.AxisHelper(1000));

  const controls = new THREE.OrbitControls(battleField.camera, renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;

  window.onclick = punchPlayer;
  animate();
})();