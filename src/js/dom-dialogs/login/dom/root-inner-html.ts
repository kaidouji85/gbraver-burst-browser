import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS_NAME } from "./class-name";
import template from "./root-inner-html.hbs";

export function rootInnerHTML(resources: Resources, caption: string): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT_CLASS_NAME,
    caption,
    closerPath,
  });
}
