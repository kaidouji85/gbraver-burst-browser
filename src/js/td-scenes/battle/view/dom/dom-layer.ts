import { map, merge, Observable } from "rxjs";

import { MessageWindow } from "../../../../game-dom/message-window/message-window";
import { MiniController } from "../../../../game-dom/mini-controller";
import type { Resources } from "../../../../resource";
import { BattleSceneAction } from "../../actions";
import { DecideBatteryByMiniController } from "../../actions/decide-battery-by-mini-controller";
import { DoBurstByMiniController } from "../../actions/do-burst-by-mini-controller";
import { DoPilotSkillByMiniController } from "../../actions/do-pilot-skill-by-mini-controller";

/** HTML要素レイヤー */
export class DOMLayer {
  /** メッセージウインドウ 右 */
  rightMessageWindow: MessageWindow;

  /** メッセージウインドウ 左 */
  leftMessageWindow: MessageWindow;

  /** メッセージウインドウ バッテリーセレクタ隣 */
  nearBatterySelectorMessageWindow: MessageWindow;

  /** メッセージウインドウ バーストボタン隣 */
  nearBurstButtonMessageWindow: MessageWindow;

  /** メッセージウインドウ パイロットボタン隣 */
  nearPilotButtonMessageWindow: MessageWindow;

  /** ミニコントローラー */
  miniController: MiniController;

  /** 戦闘シーンアクション */
  #battleAction: Observable<BattleSceneAction>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.rightMessageWindow = new MessageWindow({
      resources,
      position: "Right",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.rightMessageWindow.visible(false);
    this.leftMessageWindow = new MessageWindow({
      resources,
      position: "Left",
      facePosition: "Left",
      faceOrientation: "Right",
    });
    this.leftMessageWindow.visible(false);
    this.nearBatterySelectorMessageWindow = new MessageWindow({
      resources,
      position: "NearBatterySelector",
      facePosition: "Left",
      faceOrientation: "Right",
    });
    this.nearBatterySelectorMessageWindow.visible(false);
    this.nearBurstButtonMessageWindow = new MessageWindow({
      resources,
      position: "NearBurstButton",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.nearBurstButtonMessageWindow.visible(false);
    this.nearPilotButtonMessageWindow = new MessageWindow({
      resources,
      position: "NearPilotButton",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.nearPilotButtonMessageWindow.visible(false);
    this.miniController = new MiniController(resources);
    this.#battleAction = merge(
      this.miniController.batteryPushNotifier().pipe(
        map(
          (v): DecideBatteryByMiniController => ({
            type: "decideBatteryByMiniController",
            battery: v,
          })
        )
      ),
      this.miniController.burstPushNotifier().pipe(
        map(
          (): DoBurstByMiniController => ({
            type: "doBurstByMiniController",
          })
        )
      ),
      this.miniController.pilotPushNotifier().pipe(
        map(
          (): DoPilotSkillByMiniController => ({
            type: "doPilotSkillByMiniController",
          })
        )
      )
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.miniController.destructor();
  }

  /**
   * 戦闘シーンアクション通知
   * @return 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction> {
    return this.#battleAction;
  }

  /**
   * シーンに追加するHTML要素群を取得する
   *
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[] {
    return [
      this.rightMessageWindow.getRootHTMLElement(),
      this.leftMessageWindow.getRootHTMLElement(),
      this.nearBatterySelectorMessageWindow.getRootHTMLElement(),
      this.nearBurstButtonMessageWindow.getRootHTMLElement(),
      this.nearPilotButtonMessageWindow.getRootHTMLElement(),
      this.miniController.getRootHTMLElement(),
    ];
  }
}
