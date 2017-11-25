// @flow
import type {Resources} from '../../resource/resource-manager';
import type {Application} from '../application';
import {BattleView} from "./view/index";

/**
 * 戦闘画面アプリケーション
 */
export class BattleApplication implements Application {
  /** ビュー */
  view: BattleView;

  constructor(props: {resources: Resources}) {
    this.view = new BattleView({
      resources: props.resources
    });

    document.body.appendChild(this.view.renderer.domElement);
    window.addEventListener('resize', () => this.view.resize(), false);
  };

  gameLoop() {
    this.view.animate();
    this.view.render();
  }
}