import { PlayerState } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT } from "../dom/class-name";
import { extractCloser } from "../dom/extract-element";
import {
  createEnemyElements,
  createPlayerElements,
} from "../dom/player-elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { BattleSimulatorProps } from "../props";

/** 生成パラメータ */
export type BattleSimulatorPropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** プレイヤーのステート */
    player: PlayerState;
    /** 敵のステート */
    enemy: PlayerState;
    /** プレイヤーが攻撃側か否か、trueで攻撃側 */
    isPlayerAttacker: boolean;
  };

/**
 * 戦闘シミュレータのプロパティを生成する
 * @returns 生成結果
 */
export function createBattleSimulatorProps(
  params: BattleSimulatorPropsCreatorParams,
): BattleSimulatorProps {
  const { player, enemy, resources } = params;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(params);

  const changeValue =
    resources.sounds.find((s) => s.id == SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const closeDialog = new Subject<void>();

  const closer = extractCloser(root);
  const playerElements = createPlayerElements(root);
  const enemyElements = createEnemyElements(root);

  const playerBattery = player.armdozer.battery;
  const enemyBattery = enemy.armdozer.battery;
  return {
    ...params,

    root,
    closer,
    playerElements,
    enemyElements,

    changeValue,

    closeDialog,

    playerBattery,
    enemyBattery,
  };
}
