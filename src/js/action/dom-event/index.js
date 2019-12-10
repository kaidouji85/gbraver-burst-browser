// @flow

import type {Resize} from "./resize";
import type {TouchStart} from "./touch-start";
import type {TouchMove} from "./touch-move";
import type {TouchEnd} from "./touch-end";
import type {MouseDown, MouseMove, MouseUp} from "./mouse";

export type DOMEvent =
  Resize |
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;