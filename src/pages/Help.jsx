import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  Book, 
  ShieldCheck, 
  CreditCard, 
  UserPlus, 
  Package, 
  Heart,
  ChevronDown,
  Mail,
  MessageCircle
} from "lucide-react";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Help & Support | PawMart";
  }, []);

  const categories = [
    {
      icon: UserPlus,
      title: "Getting Started",
      description: "Learn the basics of using PawMart",
      articles: 8,
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: Package,
      title: "Adoptions",
      description: "Everything about adopting pets",
      articles: 12,
      gradient: "from-emerald-600 to-emerald-700"
    },
    {
      icon: CreditCard,
      title: "Payments & Pricing",
      description: "Billing and payment information",
      articles: 6,
      gradient: "from-amber-600 to-amber-700"
    },
    {
      icon: ShieldCheck,
      title: "Safety & Trust",
      description: "How we keep you safe",
      articles: 10,
      gradient: "from-violet-600 to-violet-700"
    },
    {
      icon: Book,
      title: "Seller Guide",
      description: "Tips for listing your pets",
      articles: 9,
      gradient: "from-rose-600 to-rose-700"
    },
    {
      icon: Heart,
      title: "Pet Care",
      description: "Resources for pet owners",
      articles: 15,
      gradient: "from-pink-600 to-pink-700"
    }
  ];

  const faqs = [
    {
      category: "General",
      question: "What is PawMart?",
      answer: "PawMart is a trusted online marketplace that connects pet lovers with responsible breeders, shelters, and pet owners. We facilitate safe and ethical pet adoptions while providing a platform for quality pet supplies and accessories."
    },
    {
      category: "Account",
      question: "How do I create an account?",
      answer: "Click the 'Join Us' button in the top right corner, fill in your details (name, email, password, photo URL), and you're all set! You can also sign up using your Google account for faster registration."
    },
    {
      category: "Adoption",
      question: "How does the adoption process work?",
      answer: "Browse our marketplace, select a pet you're interested in, click 'Adopt Now', fill out the adoption form with your details, and submit. The seller will review your application and contact you to arrange the adoption."
    },
    {
      category: "Adoption",
      question: "Are all pets verified?",
      answer: "Yes! All listings are reviewed by our team. Sellers must provide health certificates, vaccination records, and complete our verification process before their pets can be listed on our platform."
    },
    {
      category: "Safety",
      question: "Is PawMart safe to use?",
      answer: "Absolutely! We verify all sellers, require health documentation for all pets, offer secure payment processing, and provide a 7-day guarantee on all adoptions. Our support team is available to help resolve any issues."
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods. All transactions are processed securely through our encrypted payment gateway."
    },
    {
      category: "Payments",
      question: "Are there any fees for buyers?",
      answer: "No! PawMart is completely free for buyers. You only pay the adoption/purchase price set by the seller. Sellers pay a small commission only when a sale is completed."
    },
    {
      category: "Listing",
      question: "How do I list my pet for adoption?",
      answer: "After logging in, go to your dashboard and click 'Add Listing'. Fill in all required information including pet details, photos, health records, and pricing. Once submitted, our team will review and approve your listing within 24-48 hours."
    },
    {
      category: "Listing",
      question: "Can I edit my listing after it's published?",
      answer: "Yes! Go to 'My Listings' in your dashboard, find the listing you want to edit, click the edit button, make your changes, and save. Changes may require re-approval if significant."
    },
    {
      category: "Support",
      question: "How can I contact customer support?",
      answer: "You can reach us via email at support@pawmart.com, call us at +1 (234) 567-890 (Mon-Fri 9AM-6PM EST), or use the contact form on our Contact page. We typically respond within 24 hours."
    },
    {
      category: "Support",
      question: "What if I have an issue with an adoption?",
      answer: "Contact our support team immediately. We have a 7-day guarantee policy and will work with both parties to resolve any issues. In cases of misrepresentation or health concerns, we can facilitate returns or refunds."
    },
    {
      category: "Account",
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to set a new password."
    }
  ];

  const filteredFaqs = searchTerm
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs;

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
              <HelpCircle size={40} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-slate-950 dark:text-white leading-tight">
              How Can We Help?
            </h1>
            <p className="text-xl text-slate-800 dark:text-slate-400 leading-relaxed font-medium">
              Find answers to common questions and get the support you need
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto pt-6">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-16 pr-6 py-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all text-slate-950 dark:text-white text-lg shadow-xl"
              />
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">{category.title}</h3>
              <p className="text-slate-700 dark:text-slate-400 mb-4 font-medium">{category.description}</p>
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {category.articles} articles
              </p>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-800 dark:text-slate-400 font-medium">
            {searchTerm ? `Found ${filteredFaqs.length} results` : "Quick answers to common questions"}
          </p>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-1 text-xs font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">{faq.question}</h3>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-slate-400 transition-transform flex-shrink-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <Motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </Motion.div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2">No results found</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Try different keywords or browse our help categories above
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary-600 to-primary-800 p-12 text-center text-white"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is here to assist you with any questions or concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
              >
                <Mail size={20} />
                Contact Support
              </Link>
              <a
                href="mailto:support@pawmart.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border-2 border-white/30"
              >
                <MessageCircle size={20} />
                Live Chat
              </a>
            </div>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
