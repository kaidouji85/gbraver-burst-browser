// @flow

import type {Resize} from "./resize";
import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";

export type DOMEvent =
  Resize |
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;