import SubscribeForm from "@/components/common/subscribe-form";
import { basic } from "@/data/basic"; 

export default function CTA({ data = basic.cta }) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-8 p-8 overflow-hidden rounded-lg bg-accent lg:gap-12 lg:p-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h3 className="mb-4 text-4xl font-semibold md:text-3xl">{data.title}</h3>
            <p className="text-muted-foreground lg:text-lg">{data.description}</p>
          </div>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
};
