import Box from "@mui/material/Box";
import type { Copy, Locale } from "@/data/types";
import { t } from "@/lib/copy";
import { RADIUS } from "@/theme/tokens";
import { orderStepTone } from "./order-helpers";

type Props = {
  label: Copy;
  locale: Locale;
  order: number;
  status: "play" | "wrong" | "right";
  onTap: () => void;
};

const OrderStepButton = ({ label, locale, order, status, onTap }: Props) => {
  const { borderColor, bgcolor } = orderStepTone(order, status);
  return (
    <Box component="li">
      <Box
        component="button"
        type="button"
        onClick={onTap}
        disabled={order >= 0 || status !== "play"}
        sx={{
          display: "flex",
          minHeight: 48,
          width: "100%",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: `${RADIUS.sm}px`,
          border: 1,
          borderColor,
          bgcolor,
          color: "text.primary",
          textAlign: "left",
          fontSize: "0.875rem",
          fontFamily: "inherit",
          "&:hover":
            order >= 0 || status !== "play"
              ? undefined
              : { borderColor: "color-mix(in srgb, var(--op-fg) 30%, transparent)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: 28,
            height: 28,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "999px",
            border: 1,
            borderColor: "divider",
            fontSize: "0.75rem",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {order >= 0 ? order + 1 : ""}
        </Box>
        {t(label, locale)}
      </Box>
    </Box>
  );
};

export default OrderStepButton;
