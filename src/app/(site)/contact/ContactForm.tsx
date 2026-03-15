"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  sujet: z.string().min(2),
  message: z.string().min(10),
});

type Data = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Data>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: Data) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-serma-teal/10 text-serma-teal rounded-xl p-6">
        <p className="font-display font-bold">Message envoyé</p>
        <p className="mt-2 text-sm">Nous te répondrons sous 48h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-serma-navy mb-1">Nom</label>
        <input {...register("nom")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
        {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-serma-navy mb-1">Email</label>
        <input type="email" {...register("email")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-serma-navy mb-1">Téléphone (optionnel)</label>
        <input {...register("telephone")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
      </div>
      <div>
        <label className="block text-sm font-medium text-serma-navy mb-1">Sujet</label>
        <input {...register("sujet")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
        {errors.sujet && <p className="text-red-600 text-sm mt-1">{errors.sujet.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-serma-navy mb-1">Message</label>
        <textarea {...register("message")} rows={4} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" className="w-full bg-serma-orange text-serma-navy font-display font-bold py-3 rounded-lg hover:bg-serma-orange/90">
        Envoyer
      </button>
    </form>
  );
}
