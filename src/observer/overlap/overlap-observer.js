// @flow

import {Observer} from "../base/observer";
import type {OverlapAction} from "../../action/overlap/index";

export class OverlapObserver extends Observer<OverlapAction> {
  constructor() {
    super();
  }
}