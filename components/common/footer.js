import Link from "next/link";
import { basic } from "@/data/basic";

export default function Footer({ data = basic.info }) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
            <p>© 2025 {data.brand}. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li className="underline hover:text-primary">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};
