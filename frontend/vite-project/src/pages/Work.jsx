import React from 'react'
import { motion } from "framer-motion";
import { Search, Calendar, Smile } from "lucide-react";


function Work() {
  return (
    <>
    

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-14"
          >
            <span className="border border-violet-400 px-4 py-1 rounded-md">
              How Connectify Works
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: Search,
              title: "Discover Services",
              desc: "Easily browse a wide range of services and skilled professionals in your area.",
            }, {
              icon: Calendar,
              title: "Book with Ease",
              desc: "Schedule appointments at your convenience with our intuitive booking system.",
            }, {
              icon: Smile,
              title: "Relax & Enjoy",
              desc: "Get your tasks done by trusted experts, ensuring peace of mind.",
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition"
              >
                <item.icon className="w-12 h-12 mx-auto text-violet-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-700 mb-10"
          >
            Trusted by Leading Companies
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-70">
            {["Company A", "Brand B", "Partner C", "Service D", "Enterprise E"].map(
              (logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="h-10 flex items-center justify-center bg-white rounded-md shadow-sm"
                >
                  <span className="text-sm font-medium">{logo}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-14">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-white font-semibold text-lg mb-3">Connectify</h4>
            <p className="text-sm text-gray-400">
              Connecting you with trusted professionals for everyday services.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Contact</h5>
            <p className="text-sm">support@connectify.com</p>
            <p className="text-sm mt-2">+91 98765 43210</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Connectify. All rights reserved.
        </div>
      </footer>
    </>
  );
}

    

export default Work
