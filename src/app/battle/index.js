// @flow
import type {Resources} from '../../resource/resource-manager';
import type {Application} from '../application';
import {BattleView} from "./view/index";
import type {BattleAppState} from "./state";
import {ArmDozers, ArmDozerIdList, start} from 'gbraver-burst-core';
import type {BattleState} from "gbraver-burst-core/lib/flow-type";

/** コンストラクタのパラメータ */
type Props = {
  /** リソース管理オブジェクト */
  resources: Resources,
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleApplication implements Application {
  /** ビュー */
  view: BattleView;

  constructor(props: Props) {
    this.view = new BattleView({
      resources: props.resources,
      state: this.createInitialState(),
    });

    document.body.appendChild(this.view.renderer.domElement);
    window.addEventListener('resize', () => this.view.resize(), false);
  };

  gameLoop() {
    this.view.animate();
    this.view.render();
  }

  // TODO 開発用にダミーデータを作成している
  createInitialState(): BattleAppState {
    const battleState: BattleState = start(
      {
        playerId: 'test01',
        armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
      }, {
        playerId: 'test02',
        armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
      }
    );
    return {battleState, playerId: 'test01'};
  }
}