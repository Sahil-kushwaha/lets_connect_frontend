export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <main className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm text-gray-400 mt-1">
            Have questions? We're here to help.
          </p>
        </header>

        <section className="prose prose-invert">
          <h2 className="text-neutral-50 mt-3  my-1">Support</h2>
          <p>
            For general inquiries, technical support, or account-related issues,
            please reach out to us via email. We aim to respond within{" "}
            <strong className="text-neutral-100">1–2 business days</strong>.
          </p>

          <p>
            📧 Email:{" "}
            <a href="mailto:support@letconnect.in" className="text-blue-400">
              support@letconnect.in
            </a>
          </p>
          <h2 className="text-neutral-50 mt-3  my-1">Office Address</h2>
          <address>
            let's connect <br />
            Devkathia <br />
            Ghazipur,Uttar Pradesh <br />
            India
          </address>
        </section>
      </main>
    </div>
  );
}
