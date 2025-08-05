import Policy from "@/components/common/policy";
import { terms } from "@/data/terms";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsAndConditions() {
  return (
    <Policy data={terms} />
  );
};
