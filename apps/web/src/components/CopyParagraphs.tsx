import Typography from "@mui/material/Typography";
import { splitCopyParagraphs } from "@/components/copy-paragraphs-helpers";

type Props = {
  text: string;
  firstMt?: number;
};

const CopyParagraphs = ({ text, firstMt = 1.5 }: Props) => (
  <>
    {splitCopyParagraphs(text).map((paragraph, index) => (
      <Typography
        key={paragraph}
        sx={{
          mt: index === 0 ? firstMt : 1,
          maxWidth: "65ch",
          color: "var(--op-ink-soft)",
        }}
      >
        {paragraph}
      </Typography>
    ))}
  </>
);

export default CopyParagraphs;
