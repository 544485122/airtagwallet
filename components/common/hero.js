import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import SubscribeForm from "@/components/common/subscribe-form";

export default function Hero({data}) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-center">
            <Badge variant="outline">{data.badge}<ArrowDownRight className="ml-2 size-4" /></Badge>
            <h1 className="my-4 text-pretty text-4xl font-bold lg:text-6xl">{data.title}</h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{data.description}</p>
            <div className="w-full lg:w-3/4"><SubscribeForm /></div>
          </div>
          <Image src={data.image} alt={data.title} className="max-h-[500px] w-full rounded-lg object-cover" width={800} height={500} />
        </div>
      </div>
    </section>
  );
};
