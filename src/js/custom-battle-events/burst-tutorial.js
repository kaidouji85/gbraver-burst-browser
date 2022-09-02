// @flow
import type {GameState} from "gbraver-burst-core/lib/state/game-state";
import type {CustomBattleEvent, CustomBattleEventProps, LastState} from "../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "./active-message-window";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {invisibleAllMessageWindows, refreshConversation} from "./invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "./scroll-messages";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const introduction = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「さすがは大田高校はん 一瞬で勝負がついてしもたな'],
    ['どや まだ道路の占有時間も残っとるし ワイともう一戦やりまへんか」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「相談するから 少し待ってくれ」'],
  ]);
  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「監督からもGoサインが出た'],
    ['シンヤ 悪いがもう一戦だけ頑張ってくれ」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「ほないくで 大田高校のエース君」']
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「双方 姿勢を正して 礼!!」'],
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Raito');
  props.view.dom.leftMessageWindow.messages(
    ['ライト', '「よろしくお願いします」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);

  invisibleAllMessageWindows(props);
};

/** バーストチュートリアル用のカスタムバトルイベント */
class BurstTutorial extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.isIntroductionComplete = false;
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    if (!this.isIntroductionComplete) {
      await introduction(props);
      this.isIntroductionComplete = true;
    }
  }
}

/**
 * バーストチュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createBurstTutorialEvent(): CustomBattleEvent {
  return new BurstTutorial();
}