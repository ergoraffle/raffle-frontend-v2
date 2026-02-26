import { DialogClose, DialogHeader, DialogTitle } from "@ergo-raffle/ui-kit";
import { useWallet } from "./useWallet";

export const Agreement = () => {
  const wallet = useWallet();
  return (
    <>
      <DialogHeader>
        <DialogClose />
        <DialogTitle>Agreement</DialogTitle>
      </DialogHeader>
      <button type="button" onClick={wallet.agree}>
        next
      </button>
    </>
  )
}
