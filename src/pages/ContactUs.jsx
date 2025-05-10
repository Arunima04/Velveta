import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formsubmit.co/ajax/velveta.cares@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === "true") {
        setStatus("Your message was sent successfully!");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("There was an issue sending your message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-charup-darkpink mb-8" style={{ fontFamily: 'cursive', color: '#be185d' }}>
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Description"
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-charup-darkpink text-white px-6 py-2 rounded hover:bg-pink-600 transition"
          style={{ backgroundColor: '#e11d48' }}
        >
          Submit
        </button>
        {status && <p className="text-center text-sm text-gray-700 mt-4">{status}</p>}
      </form>
    </div>
  );
}
