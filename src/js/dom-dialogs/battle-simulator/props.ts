import { PlayerState } from "gbraver-burst-core";

import { PlayerElements } from "./dom/player-elements";
import {SoundResource} from "../../resource/sound/resource";
import {SEPlayer} from "../../se/se-player";

/** 戦闘シミュレータのプロパティ */
export type BattleSimulatorProps = {
  /** ルートのHTML要素 */
  root: HTMLElement;
  /** プレイヤーのHTML要素 */
  playerElements: PlayerElements;
  /** 敵のHTML要素 */
  enemyElements: PlayerElements;

  /** 効果音再生オブジェクト */
  se: SEPlayer;
  /** 効果音 値変更 */
  changeValue: SoundResource;

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
