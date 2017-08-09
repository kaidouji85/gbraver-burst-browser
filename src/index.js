// @flow
import Tween from 'tween.js';
import {ResourceManager} from './common/resource-manager';
import BattleApplication from './appication/battle/index.js';

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures()
  ]);

  const app = new BattleApplication({resources: resourceManager.resources});
  document.body.appendChild(app.renderer.domElement);
  window.onclick = () => app.punchPlayer();

  const onResize = () => app.resize();
  window.addEventListener('resize', onResize, false);

  const animate = (time: number) => {
    requestAnimationFrame( animate );
    app.animate();
    Tween.update(time);
  };
  animate();
})();