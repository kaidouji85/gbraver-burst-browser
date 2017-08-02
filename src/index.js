// @flow
import ThreeLib from 'three-js';
import Tween from 'tween.js';
import {ResourceManager} from './common/resource-manager';
import BattleFieldLayer from './layer/battle-field';
import HudLayer from './layer/hud';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/** バトルフィールドレイヤー */
let battleField: BattleFieldLayer = null;

/** Head Up Display(HUD)レイヤー */
let hudLayer: HudLayer = null;

/** レンダラー */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
renderer.setSize( window.innerWidth, window.innerHeight );

/** リソースマネージャ */
const resourceManager:  ResourceManager = new ResourceManager();
window.addEventListener( 'resize', onWindowResize, false );
document.body.appendChild( renderer.domElement );

/**
 * リサイズ時の処理
 */
function onWindowResize(): void {
  renderer.setSize( window.innerWidth, window.innerHeight );
  battleField.resize();
}

/**
 * ゲームループ
 */
function animate(time: double): void {
  requestAnimationFrame( animate );

  Tween.update(time);

  battleField.animate();
  renderer.render( battleField.scene, battleField.camera );

  hudLayer.animate();
  renderer.render(hudLayer.scene, hudLayer.camera);
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

  hudLayer = new HudLayer();

  animate();
})();