"use client";

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("/api/subscribe", formData);
      if (response.data.success) {
        setEmail("");
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shrink-0">
      <div className="flex flex-col justify-center gap-2 sm:flex-row">
        <Input type="email" placeholder="Enter your email" className="h-10 lg:min-w-72" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" className="h-10">Subscribe</Button>
      </div>
      <p className="mt-2 text-left text-xs text-muted-foreground">
        View our <Link href="/privacy-policy" className="underline hover:text-foreground">privacy policy</Link>.
      </p>
    </form>
  );
};
