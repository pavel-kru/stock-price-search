import { Component, h } from '@stencil/core';

@Component({
  tag: 'uc-loader',
  styleUrl: './loader.scss',
  shadow: true,
})
export class Loader {
  render() {
    return (
      <div class='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
