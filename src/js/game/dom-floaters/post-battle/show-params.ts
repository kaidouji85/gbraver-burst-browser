import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { PostBattleButtonConfig } from "./post-battle-button-config";

/** showメソッドのパラメータ */
export type ShowParams = ResourcesContainer &
  SEPlayerContainer & {
    /** アクションボタン設定 */
    buttons: PostBattleButtonConfig[];
  };
