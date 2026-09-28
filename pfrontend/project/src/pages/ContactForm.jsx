import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ========== LEFT SIDE - IMAGE ========== */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen relative overflow-hidden">
        <img
          src="https://thumbs.dreamstime.com/b/e-commerce-design-sketch-banner-online-shopping-set-open-sign-box-coin-isolated-vector-illustration-46384590.jpg"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* ========== RIGHT SIDE - FORM ========== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-neutral-50 px-6 sm:px-10 lg:px-16 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <span className="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase mb-3 block">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-2">
            Send us a message
          </h1>
          <p className="text-neutral-500 mb-8 text-[15px]">
            Fill out the form below and we’ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What’s this about?"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-medium py-3.5 rounded-xl hover:bg-neutral-800 transition tracking-tight mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}