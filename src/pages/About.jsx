import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Heart, Shield, Users, TrendingUp, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | PawMart";
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Pet Welfare First",
      description: "Every decision we make prioritizes the health, happiness, and safety of pets.",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We verify all sellers and ensure every listing meets our high standards.",
      gradient: "from-primary-600 to-primary-700"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by pet lovers, for pet lovers. We're a family united by our love for animals.",
      gradient: "from-emerald-600 to-emerald-700"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Constantly improving our platform to provide the best pet adoption experience.",
      gradient: "from-amber-600 to-amber-700"
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Pets Adopted", icon: "🐾" },
    { value: "5K+", label: "Trusted Sellers", icon: "⭐" },
    { value: "50+", label: "Cities Covered", icon: "📍" },
    { value: "4.9/5", label: "User Rating", icon: "💖" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Passionate about connecting pets with loving families."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Ensuring every adoption is safe and successful."
    },
    {
      name: "Emma Davis",
      role: "Community Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Building a supportive community of pet lovers."
    }
  ];

  const milestones = [
    { year: "2020", event: "PawMart Founded", description: "Started with a vision to revolutionize pet adoption" },
    { year: "2021", event: "1,000 Adoptions", description: "Reached our first major milestone" },
    { year: "2022", event: "National Expansion", description: "Expanded services to 50+ cities" },
    { year: "2023", event: "Mobile App Launch", description: "Made pet adoption accessible on-the-go" },
    { year: "2024", event: "10,000+ Happy Families", description: "Celebrating a decade of bringing joy" }
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
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl shadow-primary-600/30 mb-4">
              <Sparkles size={40} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-slate-950 dark:text-white leading-tight">
              About PawMart
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We're on a mission to create a world where every pet finds a loving home and every family discovers their perfect companion.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center shadow-xl"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-display font-bold text-primary-600 dark:text-primary-400 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</p>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-10 rounded-[2.5rem]"
        >
          <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white mb-6">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              PawMart was born from a simple belief: every pet deserves a loving home, and every family deserves the joy that comes with pet companionship. Founded in 2020, we started as a small platform connecting local pet adopters with responsible breeders and shelters.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Today, we've grown into a trusted community of over 10,000 happy families and 5,000 verified sellers across 50+ cities. Our platform has facilitated thousands of successful adoptions, each one representing a new beginning for both pets and their human companions.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              But our mission goes beyond just connecting pets with families. We're committed to promoting responsible pet ownership, supporting animal welfare initiatives, and building a community where every member shares our passion for making the world a better place for our furry friends.
            </p>
          </div>
        </Motion.div>
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                <value.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">{value.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Milestones that shaped our story
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 inline-block">
                    <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{milestone.event}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1 hidden md:block"></div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Passionate people dedicated to making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full border-4 border-white" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{member.bio}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary-600 to-primary-800 p-12 text-center text-white"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy families who found their furry friends through PawMart
            </p>
            <Link
              to="/pets-supplies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
            >
              Browse Pets
              <CheckCircle2 size={20} />
            </Link>
          </div>
        </Motion.div>
      </section>
    </div>
  );
}
