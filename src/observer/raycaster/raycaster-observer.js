// @flow

import {Observer} from "../base/observer";
import type {RaycasterAction} from "./action";

export class RaycasterObserver extends Observer<RaycasterAction> {
  constructor() {
    super();
  }
}