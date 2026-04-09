import { createElement, type ReactNode } from 'react';

import { Wallet } from '@ergo-raffle/base-wallet';
import { NautilusWallet } from '@ergo-raffle/nautilus-wallet';
import { XverseWallet } from '@ergo-raffle/xverse-wallet';

declare module '@ergo-raffle/base-wallet' {
  interface Wallet {
    iconReact: () => ReactNode;
  }
}

Object.defineProperty(Wallet.prototype, 'iconReact', {
  get() {
    return () => {
      if (!this.iconReactElement) {
        const viewBoxMatch = this.icon.match(/viewBox\s*=\s*["']([^"']+)["']/i);

        const viewBox = viewBoxMatch ? viewBoxMatch[1] : undefined;

        const innerMatch = this.icon.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);

        const innerHTML = innerMatch ? innerMatch[1].trim() : '';

        const attrs: Record<string, string> = {};

        if (viewBox) attrs.viewBox = viewBox;

        this.iconReactElement = createElement('svg', {
          ...attrs,
          dangerouslySetInnerHTML: {
            __html: innerHTML
          }
        });
      }

      return this.iconReactElement;
    };
  }
});

export type WalletName = (typeof wallets)[number]['name'];

export const wallets = [new XverseWallet({}), new NautilusWallet({})];
