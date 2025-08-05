import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FourLinkColumn({ data }) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">{data.title}</h2>
          <p className="text-center text-muted-foreground text-lg">{data.description}</p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg bg-accent">
              <Link href={item.slug} target="_blank">
                <Image src={item.image} alt={item.title} className="size-full rounded-t-lg" width={400} height={300} />
              </Link>
              <div className="p-4 space-y-2 h-full">
                <Link href={item.slug} target="_blank">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </Link>
                <p className="text-base text-muted-foreground">{item.description}</p>
                <Link href={item.slug} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">Read More <ChevronRight className="w-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
