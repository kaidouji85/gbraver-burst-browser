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
    <div className="title" onClick={props.onTouch} onTouchStart={props.onTouch} style={{
      display: props.state.isVisible ? 'flex' : 'none'
    }}>
      <img src={`${resourceBasePath()}/logo.png`} />
    </div>
  );
}