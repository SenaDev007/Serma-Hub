import Link from "next/link";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  return (
    <div className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-serma-teal/10 text-serma-teal rounded-2xl p-8">
          <h1 className="font-display font-bold text-2xl text-serma-navy">
            Inscription enregistrée
          </h1>
          <p className="mt-4 text-serma-blue/80">
            Merci ! Ton dossier a bien été enregistré.
          </p>
          {ref && (
            <p className="mt-2 font-mono text-sm text-serma-navy/80">
              Référence : {ref}
            </p>
          )}
          <p className="mt-4 text-sm text-serma-blue/80">
            Tu recevras un email de confirmation après réception de ton paiement. Pour toute question, contacte-nous.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block mt-8 text-serma-orange font-display font-bold hover:underline"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
