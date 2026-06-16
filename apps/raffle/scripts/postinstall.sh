#!/bin/bash
set -e

if [ -n "$PROXY_TRANSACTIONS_VERSION" ]; then
  npm install @ergo-raffle/proxy-transactions@${PROXY_TRANSACTIONS_VERSION} -E
fi
