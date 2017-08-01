// @flow
import ThreeLib from 'three-js';
import Tween from 'tween.js';
import {ResourceManager} from './common/resource-manager';
import SchoolStage from './stage/kamata/index';
import ShinBraver from './armdozer/shin-breaver';
import NeoLandozer from './armdozer/neo-landozer';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/** 3Dシーン関連 */
const scene: THREE.Scene = new THREE.Scene();
scene.add(new THREE.AxisHelper(1000));

const camera: THREE.Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 900;
camera.position.y = 70;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI * 0.48;

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

/** 学校フィールド */
let schoolField: SchoolStage = null;

/** プレイヤースプライト */
let playerSprite: ShinBraver = null;

/** 敵スプライト */
let enemySprite: NeoLandozer = null;

window.addEventListener( 'resize', onWindowResize, false );
document.body.appendChild( renderer.domElement );

/**
 * リサイズ時の処理
 */
function onWindowResize(): void {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/**
 * ゲームループ
 */
function animate(time: double): void {
  requestAnimationFrame( animate );

  schoolField.animate(camera);
  playerSprite.animate(camera);
  enemySprite.animate(camera);

  Tween.update(time);

  renderer.render( scene, camera );

  hudBitmap.clearRect(0, 0, width, height);
  hudBitmap.fillText('Initializing...', width / 2, height / 2);
  renderer.render( sceneHUD, cameraHUD );
}

/**
 * プレイヤーキャラがパンチする
 */
function punchPlayer() {
  console.log('punch!!');
  playerSprite.tween.stop();
  playerSprite.tween.start();
}

(async function(){
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]);

  schoolField = new SchoolStage(resourceManager.resources);
  schoolField.values().forEach(item => scene.add(item));

  playerSprite = new ShinBraver(resourceManager.resources);
  playerSprite.mesh.position.x = 150;
  scene.add(playerSprite.mesh);

  enemySprite = new NeoLandozer(resourceManager.resources);
  enemySprite.mesh.position.x = -150;
  scene.add(enemySprite.mesh);

  window.onclick = punchPlayer;
  animate();
})();