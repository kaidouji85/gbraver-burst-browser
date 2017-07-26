// @flow
import ThreeLib from 'three-js';
import Tween from 'tween.js';
import {ResourceManager} from './common/resource-manager';
import SchoolStage from './stage/kamata/index';
import ShinBraver from './armdozer/shin-breaver';
import NeoLandozer from './armdozer/neo-landozer';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

const scene: THREE.Scene = new THREE.Scene();
scene.add(new THREE.AxisHelper(1000));

const camera: THREE.Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 900;
camera.position.y = 70;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI * 0.48;

const resourceManager:  ResourceManager = new ResourceManager();

let schoolField: SchoolStage = null;
let playerSprite: ShinBraver = null;
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
 * リソース読み込み
 */
function loadResource(): Promise<> {
  return Promise.all([
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
}

/**
 * ゲームループ
 */
function animate(time: double): void {
  requestAnimationFrame( animate );

  schoolField.animate(camera);
  playerSprite.animate(camera);
  enemySprite.animate(camera);

  renderer.render( scene, camera );
}

(async function(){
  await loadResource();
  animate();
})();