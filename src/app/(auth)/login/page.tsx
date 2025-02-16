"use client";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.2 },
  },
};

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function LoginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleNavigateToLogin(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    LoginWithGoogle();
  }

  function handleNavigateToDash(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    window.location.href = "/dashboard";
  }

  return (
    <main className="bg-gradient-to-b from-black to-gray-900">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50 py-4 sm:py-6"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold blue_gradient">NextChat</h2>
          <button className="blue_btn px-4 py-2 sm:px-6 sm:py-2" onClick={handleNavigateToLogin}>
            Sign In
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="min-h-screen flex items-center pt-16 pb-8 sm:pt-20 md:pt-28 md:pb-20 px-4 md:px-0"
      >
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              variants={fadeIn}
              className="text-center md:text-left space-y-4 md:space-y-6 max-w-lg mx-auto md:mx-0"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                <span className="blue_gradient">CONNECT</span> WITH YOUR
                <br className="hidden md:block" />
                COMMUNITY IN
                <br className="hidden md:block" />
                <span className="orange_gradient">A FUN WAY</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
                Where every conversation is a story waiting to unfold
              </p>
              <Button
                isLoading={isLoading}
                type="button"
                className="blue_btn w-full md:w-auto px-6 md:px-8 py-3 text-base md:text-lg"
                onClick={LoginWithGoogle}
              >
                {!isLoading && (
                  <svg
                    className="mr-2 h-4 w-4 md:h-5 md:w-5"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                Sign in with Google
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]"
            >
              <div className="absolute inset-0 bg-[url(/heroimg1.png)] bg-contain bg-no-repeat bg-center transform scale-75 sm:scale-90 md:scale-100" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-12 sm:py-16 lg:py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <h3 className="text-3xl md:text-4xl font-bold blue_gradient mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-12 sm:py-16 lg:py-32 bg-black/50"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Choose <span className="blue_gradient">NextChat</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-12 sm:py-16 lg:py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Our Users <span className="orange_gradient">Say</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-32 bg-gradient-to-r from-blue-900 to-purple-900 relative"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 lg:mb-10">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already connecting and building
            communities on NextChat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigateToLogin}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold"
            >
              Create Account
            </motion.button>
            <button
              onClick={handleNavigateToDash}
              className="border border-white hover:bg-white/10 px-8 py-3 rounded-full font-bold"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-black/80 py-12 lg:py-20 mt-8 sm:mt-16"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            <div>
              <h3 className="text-xl font-bold mb-4">NextChat</h3>
              <p className="text-gray-400">Where conversations come alive</p>
            </div>
            {footerLinks.map((column, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 NextChat. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
};

// Keep the same data constants as the home page
const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Communities" },
  { value: "1M+", label: "Messages Sent" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  {
    title: "Instant Messaging",
    description: "Real-time conversations with zero lag",
  },
  {
    title: "Secure Chats",
    description: "End-to-end encryption for your privacy",
  },
  {
    title: "Rich Media Sharing",
    description: "Share photos, videos, and files seamlessly",
  },
];

const testimonials = [
  {
    text: "NextChat has revolutionized how we communicate within our team.",
    name: "Alex Thompson",
    role: "Team Lead",
  },
  {
    text: "The best chat platform I've used. Simple yet powerful.",
    name: "Lisa Wang",
    role: "Developer",
  },
  {
    text: "Great features and amazing user experience!",
    name: "James Wilson",
    role: "Community Manager",
  },
];

const footerLinks = [
  {
    title: "Platform",
    links: ["Features", "Security", "Enterprise", "Pricing"],
  },
  {
    title: "Support",
    links: ["Help Center", "API Docs", "Community", "Status"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Contact"],
  },
];

export default Page;
