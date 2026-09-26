import { PilotId } from "gbraver-burst-core";
import { Observable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import {
  CHECK_MARK,
  PILOT_ICON,
  PILOT_ICON_CHECKED,
  PILOT_IMAGE,
} from "./class-name";

/** パイロットアイコン */
export type PilotIcon = {
  /** パイロットID */
  readonly pilotId: PilotId;

  /**
   * ルート要素を取得する
   * @returns ルート要素
   */
  getRootElement: () => HTMLElement;

  /**
   * チェック状態を設定する
   * @param isChecked チェックされているか否か、trueで選択されている
   */
  checked(isChecked: boolean): void;

  /**
   * ポップされるアニメーションを実行する
   * @returns アニメーションが完了したら発火するPromise
   */
  pop(): Promise<void>;

  /**
   * パイロットアイコンが押されたことを通知する
   * @returns 通知ストリーム
   */
  notifyPush(): Observable<PushDOM>;
};

/** パイロットアイコン生成時のオプション */
type PilotIconOptions = ResourcesContainer & {
  /** パイロットID */
  pilotId: PilotId;
};

/** パイロットアイコンの実装 */
class PilotIconImpl implements PilotIcon {
  /** @override */
  readonly pilotId: PilotId;
  /** ルート要素 */
  readonly root: HTMLElement;
  /** プッシュ通知ストリーム */
  readonly pushNotifier: Observable<PushDOM>;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: PilotIconOptions) {
    const { resources, pilotId } = options;

    this.pilotId = pilotId;

    this.root = document.createElement("div");
    this.root.className = PILOT_ICON;

    const pilotImagePath =
      resources.paths.find((p) => p.id === getPilotIconPathId(pilotId))?.path ??
      "";
    const pilotImage = document.createElement("img");
    pilotImage.className = PILOT_IMAGE;
    pilotImage.src = pilotImagePath;
    this.root.appendChild(pilotImage);

    const checkMarkPath =
      resources.paths.find((p) => p.id === PathIds.CHECK)?.path ?? "";
    const checkMark = document.createElement("img");
    checkMark.className = CHECK_MARK;
    checkMark.src = checkMarkPath;
    this.root.appendChild(checkMark);

    this.pushNotifier = domPushStream(this.root);
  }

  /** @override */
  getRootElement(): HTMLElement {
    return this.root;
  }

  /** @override */
  checked(isChecked: boolean): void {
    this.root.className = isChecked ? PILOT_ICON_CHECKED : PILOT_ICON;
  }

  /** @override */
  pop(): Promise<void> {
    return pop(this.root);
  }

  /** @override */
  notifyPush(): Observable<PushDOM> {
    return this.pushNotifier;
  }
}

/**
 * パイロットアイコンを生成する
 * @param options オプション
 * @returns パイロットアイコン
 */
export const createPilotIcon = (options: PilotIconOptions): PilotIcon =>
  new PilotIconImpl(options);
