// @flow
import type {Notification} from '../notification';
import type {Action} from "../action";
import {resize} from './action/resize'
import {BattleApplication} from "./index";

/** イベント */
export class BattleObserver implements Notification {
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
      default:
        break;
    }
  }
}