// @flow

export default {
  title: 'three-js-objects',
};

export const Heading = () => '<h1>Hello World</h1>';

export const Button = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Hello Button';
  return btn;
};

export const ShinBraver = () => {
  const div = document.createElement('div');
  return div;
}