import Policy from "@/components/common/policy";
import { privacy } from "@/data/privacy";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <Policy data={privacy} />
  );
};
