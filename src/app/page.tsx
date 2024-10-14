"use client";

import Link from "next/link";
import { buttonVariants } from "./components/ui/button";
import { cn } from "@/lib/utils";
import DemoButton from "./signin/demo";
import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Cloud,
  Upload,
  UserCircle2,
  Shield,
} from "lucide-react";

export default async function Home() {
  const featureCardDetails = [
    {
      icon: BarChart3,
      title: "Analyze spend trends",
      description:
        "Manage your spending trends in real time with interactive charts and insights.",
    },
    {
      icon: Upload,
      title: "Upload files",
      description:
        "Seamlessly upload your transactions from your bank in various formats, including CSV.",
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description:
        "Leverage AI for smart transaction categorization and automated file cleaning.",
    },
    {
      icon: Cloud,
      title: "Upload transactions",
      description:
        "Flexible options to upload transactions one by one or in bulk, tailored to your preference.",
    },
    {
      icon: UserCircle2,
      title: "Authentication",
      description:
        "Secure authentication powered by Supabase, ensuring your data remains protected at all times.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Bank-level encryption for all your information, with zero access to sensitive transaction details.",
    },
  ];

  return (
    <div>
      <main className="flex flex-col items-center ">
        <>
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <motion.h1
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400 text-transparent bg-clip-text font-bold"
              >
                Track your finances, focus on what is important
              </motion.h1>
              <motion.p
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              >
                Managing your money is now easier than ever. Visualize your
                budget in a quick and easy way.
              </motion.p>
              <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
                className="space-x-4 flex items-center"
              >
                <Link
                  href="/signin"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "transition-transform duration-300 ease-in-out hover:text-white hover:shadow-lg transform hover:scale-105"
                  )}
                >
                  Get Started
                </Link>
                <DemoButton />
              </motion.div>
            </div>
          </section>

          <section className="container space-y-6 pb-8 pt-12 md:pb-12 md:pt-10 lg:py-32 flex flex-col gap-12 md:gap-48">
            <div className="animated-text flex flex-col gap-4 md:flex-row-reverse items-center justify-around">
              <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold text-center">
                Everything you need to manage your finances
              </h1>
              <motion.img
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://ik.imagekit.io/manuelalferez/flowinance/Group%207_QWIwA4HdR.png?updatedAt=1699611329205"
                width={10}
                className="w-2/3"
              />
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row items-center justify-around">
              <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold  text-center">
                Upload and categorize your transactions in a few clicks using AI
                ✨
              </h1>
              <motion.img
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://ik.imagekit.io/manuelalferez/flowinance/Group%208_Xna5E6_TA.png?updatedAt=1699611329296"
                width={10}
                className="w-2/3"
              />
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row-reverse items-center justify-around">
              <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold  text-center">
                Visualize all your transactions in one place
              </h1>
              <motion.img
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://ik.imagekit.io/manuelalferez/flowinance/Group%2010_Vk1VcIZ_A.png?updatedAt=1699611329310"
                width={10}
                className="w-2/3"
              />
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row items-center justify-around">
              <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold  text-center">
                Multi-currency support facilitates working with various global
                currencies
              </h1>
              <motion.img
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://ik.imagekit.io/manuelalferez/flowinance/Group%209_-UJANJ6Ik.png?updatedAt=1699611329268"
                width={10}
                className="w-3/6"
              />
            </div>
          </section>
          <section
            id="features"
            className="container space-y-6 py-8  dark:bg-transparent md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <motion.h2
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8, ease: "linear" }}
                viewport={{ once: true }}
                className="animated-text font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
              >
                Features
              </motion.h2>
              <motion.p
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8, ease: "linear" }}
                viewport={{ once: true }}
                className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
              >
                We are passionate about quality, and here are the exceptional
                features that set us apart.
              </motion.p>
            </div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "linear", delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
            >
              {featureCardDetails.map((features, index) => {
                return (
                  <div
                    key={index}
                    className="relative bg-emerald-50 overflow-hidden rounded-lg border p-2 hover:-translate-y-2 duration-500 hover:ease-out hover:bg-[#c3f1e5] group"
                  >
                    <div
                      className="absolute right-0 bottom-0 h-20 w-20 bg-gradient-to-tl from-emerald-300 to-teal-300 rounded-tl-full scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                      style={{ zIndex: -1 }}
                    ></div>
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                      <div className="mb-2">
                        <features.icon color="#50c878" size={38} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold">{features.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {features.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </section>
          <section
            id="open-source"
            className="container py-8 md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <motion.h2
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="animated-text font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
              >
                Powered by
              </motion.h2>
              <motion.p
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
                className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
              >
                Flowinance is powered by{" "}
                <b className="hover:underline">
                  <a href="https://nextjs.org" target="_blank">
                    Next.js
                  </a>
                </b>
                ,{" "}
                <b className="hover:underline">
                  <a href="https://supabase.com" target="_blank">
                    Supabase
                  </a>
                </b>{" "}
                ,{" "}
                <b className="hover:underline">
                  <a href="https://openai.com/" target="_blank">
                    OpenAI
                  </a>
                </b>{" "}
                and{" "}
                <b className="hover:underline">
                  <a href="https://ui.shadcn.com" target="_blank">
                    Shadcn.
                  </a>
                </b>
              </motion.p>
            </div>
          </section>
        </>
      </main>
    </div>
  );
}
