import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | PawMart";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@pawmart.com",
      subtext: "We reply within 24 hours",
      link: "mailto:support@pawmart.com",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (234) 567-890",
      subtext: "Mon-Fri 9AM-6PM EST",
      link: "tel:+1234567890",
      gradient: "from-emerald-600 to-emerald-700"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Pet Street, Animal City",
      subtext: "CA 94016, USA",
      link: "https://maps.google.com",
      gradient: "from-amber-600 to-amber-700"
    }
  ];

  const faqs = [
    {
      question: "How do I adopt a pet?",
      answer: "Browse our marketplace, select a pet, and click the 'Adopt' button. Fill out the adoption form and we'll connect you with the seller."
    },
    {
      question: "Is PawMart free to use?",
      answer: "Yes! PawMart is completely free for buyers. Sellers pay a small commission only when an adoption is successfully completed."
    },
    {
      question: "How are sellers verified?",
      answer: "All sellers go through a verification process including identity verification and pet health documentation checks."
    },
    {
      question: "What if I have issues with an adoption?",
      answer: "Contact our support team immediately. We have a 7-day guarantee for all adoptions and will help resolve any issues."
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl shadow-primary-600/30 mb-4">
              <MessageCircle size={40} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-slate-950 dark:text-white leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <Motion.a
              key={info.title}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                <info.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{info.title}</h3>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{info.details}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{info.subtext}</p>
            </Motion.a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </Motion.div>

          {/* FAQs & Additional Info */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Office Hours */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Office Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Monday - Friday</span>
                  <span className="font-bold text-slate-950 dark:text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Saturday</span>
                  <span className="font-bold text-slate-950 dark:text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Sunday</span>
                  <span className="font-bold text-slate-950 dark:text-white">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Quick Answers</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-semibold text-slate-950 dark:text-white">{faq.question}</span>
                      <CheckCircle2 size={18} className="text-primary-600 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l-2 border-primary-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <div className="h-96 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-600 dark:text-slate-400">Map Location</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">123 Pet Street, Animal City, CA 94016</p>
            </div>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
