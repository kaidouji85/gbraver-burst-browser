import type { ArmDozerId, PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { ArmdozerBustShotContainer } from "./armdozer-bust-shot";
import { ArmdozerSelector } from "./armdozer-selector";
import { PilotBustShotContainer } from "./pilot-bust-shot";
import { PilotSelector } from "./pilot-selector";
import { PlayerDecide } from "./player-decide";

/** プレイヤーセレクトのプロパティ */
export type PlayerSelectProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザバストショット */
  armdozerBustShot: ArmdozerBustShotContainer;
  /** パイロットバストショット */
  pilotBustShot: PilotBustShotContainer;
  /** アームドーザセレクタ */
  armdozerSelector: ArmdozerSelector;
  /** パイロットセレクタ */
  pilotSelector: PilotSelector;
  /** 現在選択中のアームドーザID */
  armdozerId: ArmDozerId;
  /** 現在選択中のパイロットID */
  pilotId: PilotId;
  /** プレイヤー決定ストリーム */
  playerDecide: Subject<PlayerDecide>;
  /** 戻るストリーム */
  prev: Subject<void>;
};