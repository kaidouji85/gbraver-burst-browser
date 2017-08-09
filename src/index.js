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
  app.debugMode();
  
  document.body.appendChild(app.renderer.domElement);

  window.onclick = () => app.punchPlayer();
  window.addEventListener('resize', () => app.resize(), false);

  const animate = (time: number) => {
    requestAnimationFrame( animate );
    app.animate();
    Tween.update(time);
  };
  animate();
})();