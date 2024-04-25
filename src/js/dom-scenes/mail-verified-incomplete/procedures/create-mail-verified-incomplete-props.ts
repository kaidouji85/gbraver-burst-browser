import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { domUuid } from "../../../uuid/dom-uuid";
import { ROOT_CLASS } from "../dom/class-name";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { MailVerifiedIncompleteProps } from "../props";

/**
 * メール認証未完了画面のプロパティを生成する
 * @param mailAddress メールアドレス
 * @returns 生成結果
 */
export function createMailVerifiedIncompleteProps(
  mailAddress: string,
): MailVerifiedIncompleteProps {
  const ids = {
    gotoTitle: domUuid(),
    reload: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, mailAddress);
  const elements = extractElements(root, ids);
  return {
    root,
    gotoTitleButton: elements.gotoTitle,
    reloadButton: elements.reload,
    gotoTitle: new Subject(),
    reload: new Subject(),
    exclusive: new Exclusive(),
  };
}
