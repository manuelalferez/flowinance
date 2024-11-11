"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Cloud,
  Upload,
  UserCircle2,
  Shield,
} from "lucide-react";
import { SphereTech } from "./components/home/sphere-tech";
import ShimmerButton from "@/components/ui/shimmer-button";
import WordPullUp from "@/components/ui/word-pull-up";
import { FancyBorder } from "./components/home/fancy-border";
import DemoButton from "./signin/demo";

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
              <WordPullUp
                className="text-4xl font-bold tracking-[-0.02em]  bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400 text-transparent bg-clip-text md:text-7xl md:leading-[5rem]"
                words="Track your finances, focus on what is important"
              />

              <motion.p
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 pt-2 pb-4"
              >
                Managing your money is now easier than ever. Visualize your
                budget in a quick and easy way.
              </motion.p>
              <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
                className="space-x-4 flex"
              >
                <ShimmerButton
                  className="shadow-2xl rounded-md py-2"
                  borderRadius="0.375rem"
                >
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    <Link href="/signin">Get Started</Link>
                  </span>
                </ShimmerButton>

                <DemoButton />
              </motion.div>
            </div>
          </section>
          <section className="container space-y-6 pb-8 pt-12 md:pb-12 md:pt-10 lg:py-32 flex flex-col gap-12 md:gap-48">
            <div className="animated-text flex flex-col gap-4 md:flex-row-reverse items-center justify-around">
              <motion.h1
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-heading w-full md:w-1/2 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold text-center"
              >
                Everything you need to manage your finances
              </motion.h1>
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="md:w-2/3"
              >
                <FancyBorder>
                  <img src="https://ik.imagekit.io/manuelalferez/flowinance/dashboard_I8oBJOKP6.png" />
                </FancyBorder>
              </motion.div>
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row items-center justify-around">
              <motion.h1
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-heading w-full md:w-1/2 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold text-center"
              >
                Upload and categorize your transactions in a few clicks using AI
                ✨
              </motion.h1>
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="md:w-1/2"
              >
                <FancyBorder>
                  <img src="https://ik.imagekit.io/manuelalferez/flowinance/ai_Qv2XljS7p.png" />
                </FancyBorder>
              </motion.div>
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row-reverse items-center justify-around">
              <motion.h1
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-heading w-full md:w-1/2 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold text-center"
              >
                Visualize all your transactions in one place
              </motion.h1>
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="md:w-2/3"
              >
                <FancyBorder>
                  <img src="https://ik.imagekit.io/manuelalferez/flowinance/transactions_S5FXYkL1G.png?updatedAt=1731334626895" />
                </FancyBorder>
              </motion.div>
            </div>
            <div className="animated-text flex flex-col gap-4 md:flex-row items-center justify-around">
              <motion.h1
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-heading w-full md:w-1/2 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-900 font-bold text-center"
              >
                Multi-currency support facilitates working with various global
                currencies
              </motion.h1>

              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="md:w-1/2"
              >
                <FancyBorder>
                  <img src="https://ik.imagekit.io/manuelalferez/flowinance/currencies_HbRYegIN1.png?updatedAt=1731334626766" />
                </FancyBorder>
              </motion.div>
            </div>
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
              <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -20, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
                className="max-w-[85%] leading-normal flex flex-col md:flex-row items-center text-muted-foreground sm:text-lg sm:leading-7"
              >
                <div>
                  <SphereTech />
                </div>
                <div>
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
                </div>
              </motion.div>
            </div>
          </section>
        </>
      </main>
    </div>
  );
}
