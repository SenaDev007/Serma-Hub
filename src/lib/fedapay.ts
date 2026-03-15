/**
 * FedaPay – intégration paiement Bénin/UEMOA
 * Documentation: https://docs.fedapay.com
 */

const FEDAPAY_API = "https://api.fedapay.com";

export interface CreateTransactionParams {
  amount: number;
  currency?: string;
  description: string;
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    phone_number?: string;
  };
  callback_url?: string;
}

export interface FedaPayTransaction {
  id: number;
  reference: string;
  amount: number;
  status: string;
  token?: string;
}

export async function createTransaction(
  params: CreateTransactionParams
): Promise<{ id: number; token: string; reference: string } | null> {
  const key = process.env.FEDAPAY_SECRET_KEY;
  if (!key) {
    console.error("FEDAPAY_SECRET_KEY manquante");
    return null;
  }
  try {
    const res = await fetch(`${FEDAPAY_API}/v1/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency ?? "XOF",
        description: params.description,
        customer: params.customer,
        callback_url: params.callback_url ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/inscription/confirmation`,
      }),
    });
    const data = await res.json();
    const transaction = data?.transaction ?? data;
    if (!transaction?.id || !transaction?.token) return null;
    return {
      id: transaction.id,
      token: transaction.token,
      reference: transaction.reference ?? String(transaction.id),
    };
  } catch (e) {
    console.error("FedaPay createTransaction error:", e);
    return null;
  }
}

export async function verifyTransaction(transactionId: string): Promise<{ status: string } | null> {
  const key = process.env.FEDAPAY_SECRET_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${FEDAPAY_API}/v1/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    const transaction = data?.transaction ?? data;
    return transaction ? { status: transaction.status } : null;
  } catch (e) {
    console.error("FedaPay verifyTransaction error:", e);
    return null;
  }
}
