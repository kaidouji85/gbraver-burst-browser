import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { ResourcesContainer } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ネットバトルセレクターダイアログのプロパティ */
export type NetBattleSelectorDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 背景 */
  backGround: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** カジュアルマッチボタン */
  casualMatchButton: HTMLElement;
  /** プライベートマッチ（ホスト）ボタン */
  privateMatchHostButton: HTMLElement;
  /** プライベートマッチ（ゲスト）ボタン */
  privateMatchGuestButton: HTMLElement;
  /** 効果音 プッシュボタン */
  pushButton: SoundResource;
  /** 効果音 値変更 */
  valueChange: SoundResource;
  /** カジュアルマッチ選択通知 */
  casualMatchSelection: Subject<void>;
  /** プライベートマッチ（ホスト）選択通知 */
  privateMatchHostSelection: Subject<void>;
  /** プライベートマッチ（ゲスト）選択通知 */
  privateMatchGuestSelection: Subject<void>;
  /** ダイアログクローズ通知 */
  dialogClosed: Subject<void>;
  /** 排他制御 */
  exclusive: Exclusive;
};

/** NetBattleSelectorDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

/**
 * NetBattleSelectrPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createNetBattleSelectrProps(
  params: PropsCreatorParams,
): NetBattleSelectorDialogProps {
  const { resources } = params;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  const dataIDs: DataIDs = {
    backGround: domUuid(),
    closer: domUuid(),
    casualMatchButton: domUuid(),
    privateMatchHostButton: domUuid(),
    privateMatchGuestButton: domUuid(),
  };
  root.innerHTML = rootInnerHTML(resources, dataIDs);
  const elements = extractElements(root, dataIDs);
  return {
    ...params,
    root,
    backGround: elements.backGround,
    closer: elements.closer,
    casualMatchButton: elements.casualMatchButton,
    privateMatchHostButton: elements.privateMatchHostButton,
    privateMatchGuestButton: elements.privateMatchGuestButton,
    pushButton:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    valueChange:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    casualMatchSelection: new Subject(),
    privateMatchHostSelection: new Subject(),
    privateMatchGuestSelection: new Subject(),
    dialogClosed: new Subject(),
    exclusive: new Exclusive(),
  };
}
