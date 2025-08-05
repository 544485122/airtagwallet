import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import ContactForm from '@/components/common/contact-form';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { basic } from '@/data/basic';

export default function Navbar({ data = basic.navbar }) {
  return (
    <section className="sticky top-0 left-0 bg-white shadow-sm z-50 py-6 mb-8 px-2">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-2">
              <Image src={data.logo} className="w-8" alt={data.brand} width={50} height={50} />
              <span className="text-xl font-bold">{data.brand}</span>
            </Link>

            {/* Menu */}
            <div className="flex items-center">
              {data.menu.map((item, index) => (
                <Link key={index} href={item.href} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: 'ghost', }), "text-base text-muted-foreground")}>{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Popup Form */}
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>{data.buttonText}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] p-8">
                <DialogHeader>
                  <DialogTitle>{data.dialogTitle}</DialogTitle>
                  <DialogDescription>{data.dialogDescription}</DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src={data.logo} className="w-8" alt={data.brand} width={50} height={50} />
              <span className="text-xl font-bold">{data.brand}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image src={data.logo} className="w-8" alt={data.brand} width={50} height={50} />
                      <span className="text-xl font-bold">{data.brand}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-col gap-4">
                  {data.menu.map((item, index) => (
                    <Link key={index} href={item.href} className="text-sm">{item.label}</Link>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 justify-start">
                    {data.mobileMenu.map((item, index) => (
                      <Link key={index} href={item.href} className={cn(buttonVariants({ variant: "ghost" }), "justify-start text-muted-foreground")}>{item.label}</Link>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>{data.buttonText}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px] p-2 lg:p-8">
                        <DialogHeader>
                          <DialogTitle>{data.dialogTitle}</DialogTitle>
                          <DialogDescription>{data.dialogDescription}</DialogDescription>
                        </DialogHeader>
                        <ContactForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
