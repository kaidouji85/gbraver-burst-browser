import { Observable, Unsubscribable } from "rxjs";

import type { TDScene } from "../td-scene";
import type {
  BattleEnd,
  BattleSceneProps,
  BattleScenePropsCreatorParams,
} from "./battle-scene-props";
import { createBattleSceneProps } from "./battle-scene-props";
import { BattleControllerType } from "./controller-type";
import { onBurst } from "./procedure/on-burst";
import { onBurstByMiniController } from "./procedure/on-burst-by-mini-controller";
import { onDecideBattery } from "./procedure/on-decide-battery";
import { onDecideBatteryByMiniController } from "./procedure/on-decide-battery-by-minicontroller";
import { onMinusBattery } from "./procedure/on-minus-battery";
import { onPilotSkill } from "./procedure/on-pilot-skill";
import { onPilotSkillByMiniController } from "./procedure/on-pilot-skill-by-mini-controller";
import { onPlusBattery } from "./procedure/on-plus-battery";
import { onToggleTimeScale } from "./procedure/on-toggle-time-scale";
import { start } from "./procedure/start";

/** コンストラクタのパラメータ */
type BattleSceneParams = BattleScenePropsCreatorParams;

/** 戦闘シーン */
export class BattleScene implements TDScene {
  #props: BattleSceneProps;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   * @params params パラメータ
   */
  constructor(params: BattleSceneParams) {
    this.#props = createBattleSceneProps(params);
    this.#unsubscriber = [
      this.#props.view.battleActionNotifier().subscribe((action) => {
        if (action.type === "plusBattery") {
          onPlusBattery(this.#props);
        } else if (action.type === "minusBattery") {
          onMinusBattery(this.#props);
        } else if (action.type === "decideBattery") {
          onDecideBattery(this.#props, action);
        } else if (action.type === "doBurst") {
          onBurst(this.#props, action);
        } else if (action.type === "doPilotSkill") {
          onPilotSkill(this.#props, action);
        } else if (action.type === "toggleTimeScale") {
          onToggleTimeScale(this.#props, action);
        } else if (action.type === "decideBatteryByMiniController") {
          onDecideBatteryByMiniController(this.#props, action);
        } else if (action.type === "doBurstByMiniController") {
          onBurstByMiniController(this.#props);
        } else if (action.type === "doPilotSkillByMiniController") {
          onPilotSkillByMiniController(this.#props);
        }
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscriber.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getDOMLayerElements(): HTMLElement[] {
    return this.#props.view.dom.getHTMLElements();
  }

  /**
   * ゲーム終了通知
   * @return 通知ストリーム
   */
  gameEndNotifier(): Observable<BattleEnd> {
    return this.#props.endBattle;
  }

  /**
   * 戦闘シーンを開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   * @return 処理が完了したら発火するPromise
   */
  async start(): Promise<void> {
    await start(this.#props);
  }
}
