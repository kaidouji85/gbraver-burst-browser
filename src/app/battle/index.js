// @flow
import type {Resources} from '../../resource/resource-manager';
import type {Application} from '../application';
import {BattleView} from "./view/index";
import type {BattleAppState} from "./state";
import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";
import {BattleObserver} from "./observer";
import {debugMode} from './debug-mode';

/** コンストラクタのパラメータ */
type Props = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 戦闘状態 */
  battleState: BattleState,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleApplication implements Application {
  /** ビュー */
  view: BattleView;
  /** 戦闘画面全体の状態 */
  state: BattleAppState;
  /** 画面全体のオブザーバ */
  observer: BattleObserver;

  constructor(props: Props) {
    this.state = {
      battleState: props.battleState,
      playerId: props.playerId
    };
    this.observer = new BattleObserver({
      app: this,
    });
    this.view = new BattleView({
      resources: props.resources,
      state: this.state,
    });

    const dom = this.view.renderer.domElement || new HTMLElement();
    document.body.appendChild(dom);

    window.addEventListener('resize', () => {
      this.observer.notify({type: 'resize'})
    }, false);

    // TODO 開発用にデバッグモードを有効にする
    debugMode(this.view);
  };

  gameLoop() {
    this.observer.notify({type: 'gameLoop'});
    this.view.render();
  }
}