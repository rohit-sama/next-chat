'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  const handleNavigateToDash = () => {
    router.push('/dashboard');
  };

  return (
    <main className="bg-gradient-to-b from-black to-gray-900">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50 py-6"
      >
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold blue_gradient">NextChat</h2>
          <button className="blue_btn" onClick={handleNavigateToLogin}>Sign In</button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="min-h-screen flex items-center pt-28 pb-20 lg:pb-32"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeIn}
              className="text-left space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="blue_gradient">CONNECT</span> WITH YOUR<br/>
                COMMUNITY IN<br/>
                <span className="orange_gradient">A FUN WAY</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Where every conversation is a story waiting to unfold
              </p>
              <div className="flex gap-4">
                <button 
                  className="blue_btn text-lg px-8 py-3"
                  onClick={handleNavigateToDash}
                >
                  Get Started
                </button>
                <button 
                  className="border border-white/20 hover:bg-white/10 rounded-full px-8 py-3"
                  onClick={handleNavigateToDash}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative h-[400px] md:h-[600px]"
            >
              <div className="absolute inset-0 bg-[url(/heroimg1.png)] bg-contain bg-no-repeat bg-center" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 lg:py-32 relative"
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
                <h3 className="text-3xl md:text-4xl font-bold blue_gradient mb-2">{stat.value}</h3>
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
        className="py-24 lg:py-32 bg-black/50"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-center mb-16">
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
        className="py-24 lg:py-32 relative"
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
        className="py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 relative"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 lg:mb-10">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who are already connecting and building communities on NextChat</p>
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
        className="bg-black/80 py-16 lg:py-20 mt-16"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
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
                      <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 NextChat. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '500+', label: 'Communities' },
  { value: '1M+', label: 'Messages Sent' },
  { value: '99.9%', label: 'Uptime' }
];

const testimonials = [
  {
    text: "NextChat has transformed how our team communicates. It's intuitive and fun to use!",
    name: "Sarah Johnson",
    role: "Product Manager"
  },
  {
    text: "The best community platform I've ever used. The features are exactly what we needed.",
    name: "Mike Chen",
    role: "Community Leader"
  },
  {
    text: "Security and ease of use make NextChat stand out from other platforms.",
    name: "Emma Davis",
    role: "Tech Lead"
  }
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "Enterprise"]
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API", "Status"]
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"]
  }
];

const features = [
  {
    title: "Real-time Chat",
    description: "Experience seamless conversations with instant message delivery"
  },
  {
    title: "Community Building",
    description: "Create and join communities that share your interests"
  },
  {
    title: "Secure & Private",
    description: "Your conversations are protected with end-to-end encryption"
  }
];
