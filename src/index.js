// @flow
import Tween from 'tween.js';
import {ResourceManager} from './resource/resource-manager';
import {BattleApplication} from './app/battle/index.js';
import type {Application} from './app/application';

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  const app: Application = new BattleApplication({
    resources: resourceManager.resources,
  });

  const animate = (time: ?number) => {
    requestAnimationFrame( animate );
    app.render();
    Tween.update(time);
  };
  animate();
})();