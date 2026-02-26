import { DialogClose, DialogHeader, DialogTitle } from "@ergo-raffle/ui-kit";
import { useWallet } from "./useWallet";
import { useCallback, useState } from "react";

const validate = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 250);
  })
}

export const ErgoWalletAddress = () => {
  const wallet = useWallet();

  const [address, setAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [hasError, setHasError] = useState<boolean>();

  const handleClick = useCallback(async () => {
    setHasError(false)
    setIsLoading(true);
    try {
      await validate();
      wallet.setErgoAddress(address);
    } catch {
      setHasError(true)
    }
    setIsLoading(false)
  }, [address, wallet.setErgoAddress]);
  
  return (
    <>
      <DialogHeader>
        <DialogClose />
        <DialogTitle>Enter your Ergo wallet address</DialogTitle>
      </DialogHeader>
      <input value={address} onInput={(event) => setAddress(event.target.value?.trim())} />
      {!!hasError && (
        <div>
          eroooooor
        </div>
      )}
      <button disabled={!!isLoading} type="button" onClick={() => wallet.setCandidate(undefined)}>
        back
      </button>
      <button disabled={!!isLoading || !address} type="button" onClick={handleClick}>
        next
      </button>
    </>
  )
}
