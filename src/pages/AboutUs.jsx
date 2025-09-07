export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <main className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="text-sm text-gray-400 mt-1">
            Learn more about our mission, vision, and the people behind{" "}
            <strong>Let's connect</strong>.
          </p>
        </header>

        <section className="prose prose-invert">
          <h2>Who We Are</h2>
          <p>
            <strong>Let's connect</strong> is a social networking platform built
            exclusively for developers. Our mission is to connect programmers,
            foster meaningful conversations, and build a community where ideas,
            code, and innovation thrive.
          </p>

          <h2>Our Mission</h2>
          <p>
            We aim to empower developers by providing them with a dedicated
            space to collaborate, share knowledge, and grow professionally.
            Unlike traditional social networks, we focus entirely on the
            developer ecosystem — from students learning their first line of
            code to professionals building world-changing applications.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>🧑‍💻 Developer-to-developer networking and collaboration.</li>
            <li>💬 Real-time discussions and community groups.</li>
            <li>📚 Knowledge sharing through posts, blogs, and Q&A.</li>
            <li>
              🚀 Opportunities for growth, mentorship, and career building.
            </li>
          </ul>

          <h2>Our Vision</h2>
          <p>
            To become the go-to platform for every developer seeking
            collaboration, support, and inspiration. We believe the future of
            technology is built together, and our platform is here to make that
            collaboration easier and more impactful.
          </p>

          <h2>Contact</h2>
          <p>
            Got questions, feedback, or ideas? Reach us at{" "}
            <a href="mailto:support@letconnect.in" className="text-blue-400">
              support@letconnect.in
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
