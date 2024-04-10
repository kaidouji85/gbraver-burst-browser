import { map, merge, Observable } from "rxjs";

import { MessageWindow } from "../../../../game-dom/message-window";
import { MiniController } from "../../../../game-dom/mini-controller";
import { BattleSceneAction } from "../../actions";
import { DecideBatteryByMiniController } from "../../actions/decide-battery-by-mini-controller";
import { DoBurstByMiniController } from "../../actions/do-burst-by-mini-controller";
import { DoPilotSkillByMiniController } from "../../actions/do-pilot-skill-by-mini-controller";
import { GenerateBattleViewParams } from "../generate-params";

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
  /** 叫びメッセージウインドウ プレイヤー */
  playerShoutMessageWindow: MessageWindow;
  /** 叫びメッセージウインドウ 敵 */
  enemyShoutMessageWindow: MessageWindow;
  /** ミニコントローラー */
  miniController: MiniController;
  /** 戦闘シーンアクション */
  #battleAction: Observable<BattleSceneAction>;

  /**
   * コンストラクタ
   * @param params 生成パラメータ
   */
  constructor(params: GenerateBattleViewParams) {
    const { resources } = params;
    this.rightMessageWindow = new MessageWindow({
      resources,
      type: "Right",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.rightMessageWindow.visible(false);
    this.leftMessageWindow = new MessageWindow({
      resources,
      type: "Left",
      facePosition: "Left",
      faceOrientation: "Right",
    });
    this.leftMessageWindow.visible(false);
    this.nearBatterySelectorMessageWindow = new MessageWindow({
      resources,
      type: "NearBatterySelector",
      facePosition: "Left",
      faceOrientation: "Right",
    });
    this.nearBatterySelectorMessageWindow.visible(false);
    this.nearBurstButtonMessageWindow = new MessageWindow({
      resources,
      type: "NearBurstButton",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.nearBurstButtonMessageWindow.visible(false);
    this.nearPilotButtonMessageWindow = new MessageWindow({
      resources,
      type: "NearPilotButton",
      facePosition: "Right",
      faceOrientation: "Left",
    });
    this.nearPilotButtonMessageWindow.visible(false);
    this.playerShoutMessageWindow = new MessageWindow({
      resources,
      type: "PlayerShout",
      faceOrientation: "Left",
      facePosition: "Right",
    });
    this.playerShoutMessageWindow.visible(false);
    this.enemyShoutMessageWindow = new MessageWindow({
      resources,
      type: "EnemyShout",
      faceOrientation: "Right",
      facePosition: "Left",
    });
    this.enemyShoutMessageWindow.visible(false);
    this.miniController = new MiniController(resources);
    this.#battleAction = merge(
      this.miniController.batteryPushNotifier().pipe(
        map(
          (v): DecideBatteryByMiniController => ({
            type: "decideBatteryByMiniController",
            battery: v,
          }),
        ),
      ),
      this.miniController.burstPushNotifier().pipe(
        map(
          (): DoBurstByMiniController => ({
            type: "doBurstByMiniController",
          }),
        ),
      ),
      this.miniController.pilotPushNotifier().pipe(
        map(
          (): DoPilotSkillByMiniController => ({
            type: "doPilotSkillByMiniController",
          }),
        ),
      ),
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
      this.playerShoutMessageWindow.getRootHTMLElement(),
      this.enemyShoutMessageWindow.getRootHTMLElement(),
      this.miniController.getRootHTMLElement(),
    ];
  }
}
