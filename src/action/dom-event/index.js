// @flow

import type {Resize} from "./resize";
import type {MouseDown} from "./mouse-down";
import type {MouseMove} from "./mouse-move";
import type {MouseUp} from "./mouse-up";
import type {TouchStart} from "./touch-start";
import type {TouchMove} from "./touch-move";
import type {TouchEnd} from "./touch-end";

export type DOMEvent =
  Resize |
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;