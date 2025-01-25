import { PlayerId } from "gbraver-burst-core";

import { BGMManagerContainer } from "../../../../bgm/bgm-manager";
import { SEPlayerContainer } from "../../../../se/se-player";
import { AnimationTimeScaleContainer } from "../../animation-time-scale-container";
import { BattleControllerType } from "../../controller-type";
import { BattleSceneSounds } from "../../sounds";
import { BattleSceneView } from "../../view";

/**
 * ステートアニメーションで利用する戦闘シーンプロパティ
 * 本データ型はステートアニメーション内でのみ利用する想定である
 */
export type StateAnimationProps = BGMManagerContainer &
  SEPlayerContainer &
  AnimationTimeScaleContainer & {
    /** 画面を開いているプレイヤーのID */
    readonly playerId: PlayerId;
    /** 戦闘シーンビュー */
    readonly view: BattleSceneView;
    /** 戦闘シーン音素材 */
    readonly sounds: BattleSceneSounds;
    /** コントローラータイプ */
    readonly controllerType: BattleControllerType;
  };
