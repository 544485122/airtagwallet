"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";

export default function ContactForm() {
  const [data, setData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("company", data.company);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("quantity", data.quantity);
    formData.append("message", data.message);

    try {
      const response = await axios.post("/api/touch", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          name: "",
          company: "",
          email: "",
          phone: "",
          quantity: "",
          message: ""
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error Submitting Info");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="w-full space-y-4 rounded-lg border p-6 shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2.5 text-sm font-medium"><label htmlFor="name">Name<span className="text-red-500 pl-1">*</span></label></div>
            <Input onChange={onChangeHandler} id="name" name="name" value={data.name} type="text" placeholder="Joe Average" required />
          </div>
          <div>
            <div className="mb-2.5 text-sm font-medium"><label htmlFor="company">Company</label></div>
            <Input onChange={onChangeHandler} id="company" name="company" value={data.company} type="text" placeholder="Apple Corp" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2.5 text-sm font-medium"><label htmlFor="email">Email<span className="text-red-500 pl-1">*</span></label></div>
            <Input onChange={onChangeHandler} id="email" name="email" value={data.email} type="email" placeholder="name@company.com" required />
          </div>
          <div>
            <div className="mb-2.5 text-sm font-medium"><label htmlFor="phone">Phone</label></div>
            <Input onChange={onChangeHandler} id="phone" name="phone" value={data.phone} type="tel" placeholder="+1 (123) 456-7890" />
          </div>
        </div>
        <div>
          <div className="mb-2.5 text-sm font-medium"><label htmlFor="quantity">Purchase Quantity</label></div>
          <Select onValueChange={(value) => setData({ ...data, quantity: value })} value={data.quantity}>
            <SelectTrigger id="quantity" name="quantity">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="750">750</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="1500">1500</SelectItem>
              <SelectItem value="2000">2000</SelectItem>
              <SelectItem value="3000">3000</SelectItem>
              <SelectItem value="5000">5000</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-2.5 text-sm font-medium"><label htmlFor="message">Message<span className="text-red-500 pl-1">*</span></label></div>
          <Textarea onChange={onChangeHandler} id="message" name="message" value={data.message} placeholder="Please provide any additional details or specific requirements..." className="min-h-[320px]" required />
        </div>
        <div className="flex w-full flex-col justify-end space-y-3 pt-2">
          <Button type="submit">Get Free Quote</Button>
          <div className="text-xs text-muted-foreground">
            View our <Link href="/privacy-policy" className="underline">privacy policy</Link>.
          </div>
        </div>
      </div>
    </form>
  );
};
