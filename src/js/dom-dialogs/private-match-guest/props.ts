import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHtml } from "./dom/root-inner-html";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** ルームID入力フォーム */
  roomID: HTMLInputElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 効果音 ボタンプッシュ */
  pushButton: SoundResource;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ダイアログ閉じる通知 */
  dialogClosed: Subject<void>;
  /**
   * プライベートマッチ開始通知
   * ユーザが入力したルームIDをストリームとして渡す
   */
  privateMatchStart: Subject<string>;
};

/** PrivateMatchGuestDialogProps生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * PrivateMatchGuestDialogPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createPrivateMatchGuestDialogProps(
  params: PropsCreatorParams,
): PrivateMatchGuestDialogProps {
  const { resources, se } = params;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  const dataIDs: DataIDs = {
    closer: domUuid(),
    roomID: domUuid(),
    enterButton: domUuid(),
  };
  root.innerHTML = rootInnerHtml(resources, dataIDs);
  const elements = extractElements(root, dataIDs);
  return {
    ...elements,
    root,
    dialogClosed: new Subject(),
    privateMatchStart: new Subject(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    pushButton:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    se,
    exclusive: new Exclusive(),
  };
}
