import { Box, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEtherFixed } from "utils/numbers";

interface Props {
  invocations: number;
  maxInvocations: number;
  maxHasBeenInvoked: boolean;
  maxTx: number;
  pricePepe: string;
  priceWei: string;
  amountPhase1Cap: number | null;
  amountPhase2Cap: number | null;
  phase1Minted: number | null;
  phase2Minted: number | null;
}

const MintingProgressPass = ({
  invocations,
  maxInvocations,
  maxHasBeenInvoked,
  maxTx,
  priceWei,
  pricePepe,
  amountPhase1Cap,
  amountPhase2Cap,
  phase1Minted,
  phase2Minted,
}: Props) => {
  const invocationsDisplay = invocations ? invocations.toString() : "0";
  const maxInvocationsDisplay = maxInvocations
    ? maxInvocations.toString()
    : "0";
  const progress =
    invocations && maxInvocations
      ? (invocations / maxInvocations) * 100
      : 0;

  return (
    <Box
    width={{ xs: "100%", lg: "100%" }}
      sx={{
        textAlign: { xs: "center", lg: "left" }, // Align text center for xs to md, and left for lg and above
      }}
    >
      {!maxHasBeenInvoked && (
        <Box>
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
            TOTAL MINTED: {invocationsDisplay} / {maxInvocationsDisplay} 
          </Typography>
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
            COST: {priceWei} ETH or {pricePepe} PEPE
          </Typography>
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
            MAX {maxTx} PER TRANSACTION
          </Typography>
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
            LICENSE: CC BY-NC 4.0
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MintingProgressPass;
