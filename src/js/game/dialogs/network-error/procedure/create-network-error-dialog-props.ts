import { Subject } from "rxjs";

import { Exclusive } from "../../../../event/exclusive/exclusive";
import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../../sounds/se/se-player";
import { PostNetworkError } from "../../../post-network-error";
import { ROOT_CLASS } from "../dom/class-name";
import { extractPostNetworkErrorButton } from "../dom/extract-element";
import { rootInnerHtml, RootInnerHtmlOptions } from "../dom/root-inner-html";
import { NetworkErrorDialogProps } from "../props";

/** NetworkErrorDialogProps 生成オプション */
export type CreateNetworkErrorDialogPropsOptions = ResourcesContainer &
  SEPlayerContainer &
  RootInnerHtmlOptions & {
    /** 通信エラーの後処理 */
    postNetworkError: PostNetworkError;
  };

/**
 * NetworkErrorDialogPropsを生成する
 * @param options オプション
 * @returns 生成結果
 */
export const createNetworkErrorDialogProps = (
  options: CreateNetworkErrorDialogPropsOptions,
): NetworkErrorDialogProps => {
  const { resources, se, postNetworkError } = options;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(options);

  const postNetworkErrorButton = extractPostNetworkErrorButton(root);
  const postNetworkErrorSource = new Subject<PostNetworkError>();
  const exclusive = new Exclusive();
  const pushButtonSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  return {
    postNetworkError,

    root,
    postNetworkErrorButton,

    postNetworkErrorSource,
    exclusive,

    se,
    pushButtonSound,
  };
};
