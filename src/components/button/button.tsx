import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: './button.scss',
  scoped: true,
})
export class ButtonComponent {
  @Prop() type: string;
  @Prop({ reflect: true }) disabled: boolean;

  render() {
    return (
      <button class='button' disabled={this.disabled} type={this.type}>
        <slot />
      </button>
    );
  }
}
