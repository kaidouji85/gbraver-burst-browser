import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../resource/sound";
import { createStreamSource, StreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ネットバトルセレクターのプロパティ */
export type NetBattleSelectrProps = {
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
  casualMatchSelection: StreamSource<void>;
  /** プライベートマッチ（ホスト）選択通知 */
  privateMatchHostSelection: StreamSource<void>;
  /** プライベートマッチ（ゲスト）選択通知 */
  privateMatchGuestSelection: StreamSource<void>;
  /** ダイアログクローズ通知 */
  dialogClosed: StreamSource<void>;
  /** 排他制御 */
  exclusive: Exclusive;
};

/**
 * NetBattleSelectrPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createNetBattleSelectrProps(
  resources: Resources
): NetBattleSelectrProps {
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
    casualMatchSelection: createStreamSource(),
    privateMatchHostSelection: createStreamSource(),
    privateMatchGuestSelection: createStreamSource(),
    dialogClosed: createStreamSource(),
    exclusive: new Exclusive(),
  };
}
