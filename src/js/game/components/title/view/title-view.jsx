// @flow

import React from 'react';
import type {TitleState} from "../state/title-state";
import {resourceBasePath} from "../../../../resource/resource-base-path";

/** プロパティ */
type Props = {
  state: TitleState,
  onTouch: () => void,
};

/**
 * タイトルシーンのビュー
 *
 * @param props プロパティ
 * @return ビュー
 */
export function titleView(props: Props) {
  return (
    <div className={props.state.isVisible ? 'title' : 'title--invisible'} onClick={props.onTouch} onTouchStart={props.onTouch} >
      <img src={`${resourceBasePath()}/logo.png`} />
      <p className="title_touch-start">TOUCH START</p>
    </div>
  );
}