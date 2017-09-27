// @flow
import {ResourceManager} from '../../src/common/resource-manager';
import {CanvasScene} from '../util/canvas-scene'

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager('../../');
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  const scene = new CanvasScene();
  document.body.appendChild(scene.renderer.domElement);

  window.addEventListener('resize', () => scene.resize(), false);

  const animate = () => {
    requestAnimationFrame( animate );
    const context = scene.canvas.getContext('2d');
    // ここに色々とレンダリング関係を書く
    context.fillStyle = 'rgb(192, 80, 77)';
    context.fillRect(0, 0, window.innerWidth, window.innerWidth);

    scene.render();
  };
  animate();
})();