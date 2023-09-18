import type { PlayerId } from "gbraver-burst-core";

import { AnimatePlayer } from "../../../../animation/animate-player";
import type { BGMManager } from "../../../../bgm/bgm-manager";
import { BattleControllerType } from "../../controller-type";
import { BattleSceneSounds } from "../../sounds/sounds";
import { BattleSceneView } from "../../view";

/**
 * ステートアニメーションで利用する戦闘シーンプロパティ
 * 本データ型はステートアニメーション内でのみ利用する想定である
 */
export type StateAnimationProps = {
  /** 画面を開いているプレイヤーのID */
  readonly playerId: PlayerId;
  /** Animateプレイヤー */
  readonly animatePlayer: AnimatePlayer;
  /** 戦闘シーンビュー */
  readonly view: BattleSceneView;
  /** 戦闘シーン音素材 */
  readonly sounds: BattleSceneSounds;
  /** BGM管理オブジェクト */
  readonly bgm: BGMManager;
  /** コントローラータイプ */
  readonly controllerType: BattleControllerType;
};
