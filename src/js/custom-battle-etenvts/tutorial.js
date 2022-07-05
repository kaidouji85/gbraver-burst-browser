// @flow
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {all} from "../animation/all";
import {toInitial, track} from "../game/td-scenes/battle/animation/td-camera";
import type {CustomBattleEvent, CustomBattleEventProps} from "../game/td-scenes/battle/custom-battle-event";
import {ShinyaHUD} from "../game/td-scenes/battle/view/hud/pilot-objects/shinya";
import {ShinBraverTD} from "../game/td-scenes/battle/view/td/armdozer-objects/shin-braver";
import type {NPC} from "../npc/npc";
import {oneBatteryNeoLandozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {waitUntilWindowPush} from "./wait-until-window-push";

/** チュートリアルイベント */
export interface TutorialEvent extends CustomBattleEvent {
  /** プレイヤー情報 */
  player: Player;
  /** NPC */
  npc: NPC;
}

/** チュートリアルイベントの実装 */
class SimpleTutorialEvent implements TutorialEvent {
  player: Player;
  npc: NPC;
  #turnCount: number;

  /**
   * コンストラクタ
   */
  constructor() {
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryNeoLandozerNPC();
    this.#turnCount = 1;
  }

  /** @override */
  async willLastState(props: CustomBattleEventProps): Promise<void> {
    this.#turnCount += props.stateHistory
      .filter(v => v.effect.name === 'TurnChange')
      .length;
    const isGameEnd = props.stateHistory
      .filter(v => v.effect.name === 'GameEnd')
      .length >= 1;
    const playerPilot = props.view.hud.pilots.find(v => v.playerId === this.player.playerId);
    const playerSprite = props.view.td.armdozerObjects.find(v => v.playerId === this.player.playerId);
    if (!playerPilot || !(playerPilot instanceof ShinyaHUD) || !playerSprite || !(playerSprite instanceof ShinBraverTD)) {
      return;
    }
    const shinyaHUD: ShinyaHUD = playerPilot;
    const shinBraverTD: ShinBraverTD = playerSprite;

    const firstTurn = async () => {
      props.view.dom.messageWindow.visible(true);
      props.view.dom.messageWindow.messages([
        'シンヤ',
        '　いくぜ',
        '　シンブレイバー、バトルオン!!'
      ]);
      await all(
        shinyaHUD.cutIn.show(),
        track(props.view.td.camera, shinBraverTD.sprite().getObject3D().position.x, 500),
      ).play();
      await waitUntilWindowPush(props);
      props.view.dom.messageWindow.visible(false);
      await all(
        shinyaHUD.cutIn.hidden(),
        toInitial(props.view.td.camera, 500)
      ).play();
    };

    const defaultAnimation = async () => {
      props.view.dom.messageWindow.visible(true);
      const message = isGameEnd ? 'ゲーム終了' : `${this.#turnCount}ターン目`;
      props.view.dom.messageWindow.messages([message]);
      await waitUntilWindowPush(props);
      props.view.dom.messageWindow.visible(false);
    };

    if (this.#turnCount === 1) {
      await firstTurn();
    } else {
      await defaultAnimation();
    }
  }
}

/**
 * チュートリアルイベントを生成する
 *
 * @return チュートリアルイベント
 */
export function createTutorialEvent(): TutorialEvent {
  return new SimpleTutorialEvent();
}