"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-background text-foreground pt-20">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-foreground/5 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10 flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-block border border-foreground/20 px-3 py-1 text-xs font-mono tracking-widest uppercase bg-background/50 backdrop-blur-sm">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              CONTACT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
                US
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
              Ready to start your next project? We&apos;re here to help you
              transform your ideas into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto w-full">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Reach out to us directly. We are always open to discussing new
                  projects, creative ideas or opportunities to be part of your
                  visions.
                </p>

                <div className="space-y-6 pt-4">
                  <Link
                    href="mailto:contact@scriber.in"
                    className="flex items-start gap-4 group p-4 rounded-lg border border-transparent hover:border-border hover:bg-foreground/5 transition-all"
                  >
                    <div className="p-3 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                        contact@scriber.in
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 inline-block border-b border-transparent group-hover:border-foreground/50">
                        Click to send mail
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-start gap-4 group p-4 rounded-lg border border-transparent hover:border-border hover:bg-foreground/5 transition-all">
                    <div className="p-3 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">India</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Serving clients in the Indian region. Planning to extend
                        world-wide soon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-background/80 backdrop-blur-md border border-border p-6 md:p-8 shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-20"></div>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
