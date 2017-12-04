// @flow
import type {Observer} from '../observer';
import type {Action} from "../action";
import {BattleApplication} from "./index";
import {resize} from './action/resize'
import {gameLoop} from './action/game-loop';

/** イベント */
export class BattleObserver implements Observer {
  /** 戦闘画面全体のオブジェクト */
  app: BattleApplication;

  constructor(props: {app: BattleApplication}) {
    this.app = props.app;
  }

  /** 通知されたイベントに応じて、実際のアクションを呼び出す */
  notify(action: Action) {
    switch (action.type) {
      case 'resize':
        resize(this.app.state, this.app.view);
        break;
      case 'gameLoop':
        gameLoop(this.app.state, this.app.view);
        break;
      default:
        break;
    }
  }
}