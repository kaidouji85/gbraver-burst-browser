import { PlayerState } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
import { PlayerElements } from "./dom/player-elements";

/** 戦闘シミュレータのプロパティ */
export type BattleSimulatorProps = {
  /** ルートのHTML要素 */
  root: HTMLElement;
  /** 閉じるアイコンのHTML要素 */
  closer: HTMLElement;
  /** プレイヤーのHTML要素 */
  playerElements: PlayerElements;
  /** 敵のHTML要素 */
  enemyElements: PlayerElements;

  /** 効果音再生オブジェクト */
  se: SEPlayer;
  /** 効果音 値変更 */
  changeValue: SoundResource;

  /** ダイアログを閉じるストリーム */
  closeDialog: Subject<void>;

  /** プレイヤーのステート */
  player: PlayerState;
  /** プレイヤーがダイアログ上で選択しているバッテリー値 */
  playerBattery: number;
  /** 敵のステート */
  enemy: PlayerState;
  /** 敵がダイアログ上で選択しているバッテリー値 */
  enemyBattery: number;
  /** プレイヤーが攻撃側か否か、trueで攻撃側 */
  isPlayerAttacker: boolean;
};
