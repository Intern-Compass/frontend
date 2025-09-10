import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { LoginForm } from "@/components/features/supervisor/login/login-form";

export default function LoginPage() {
  return (
    <div className="py-6 px-8 h-screen min-h-screen">
      <div className="mb-8">
        <Image
          src="/assets/images/logo.svg"
          alt="MTN logo"
          width={91}
          height={45}
          priority
          className="w-[91px] h-[45px]"
        />
      </div>
      <div className="flex justify-evenly items-center gap-12 p-6 md:p-10">
        <div className="flex flex-col">
          <header>
            <h1 className="font-medium text-4xl leading-10 mb-1">{"Y'ello"}</h1>
            <h2 className="md:text-xl leading-7">
              Welcome to the Intern-Supervisor Matching Platform
            </h2>
          </header>
          <main className="flex-1 mb-10">
            <div className="md:max-w-full">
              <LoginForm />
              <p className="text-muted-foreground text-center text-sm">
                {"Don't"} have an account?{" "}
                <Link
                  href="/intern/signup"
                  className="underline leading-5 text-sm text-foreground"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </main>
          <footer className="flex flex-wrap justify-center items-center gap-x-3 gap-y-6 text-sm md:flex-row">
            <p className="whitespace-nowrap text-muted-foreground">
              © 2025 MTN. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.mtn.ng/legal/" target="_blank">
                Terms & Conditions
              </a>
              <Separator orientation="vertical" className="!h-2.5 bg-border" />
              <a
                href="https://www.mtn.ng/legal/privacy-and-data-protection-policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </div>
          </footer>
        </div>
        <figure className="hidden max-w-[461px] rounded-xl overflow-hidden shadow-[0_4px_94px_0_rgba(0,0,0,0.25)] md:block">
          <Image
            src="/assets/images/auth-hero.jpg"
            alt=""
            width={461}
            height={609}
            priority
            className="w-full max-h-[500px] mx-auto object-[50%_12.5%]"
          />
          <figcaption className="bg-black px-10 py-[2.3125rem]">
            <p className="text-white text-4xl font-medium leading-10 mb-3">
              Apply & Learn
            </p>
            <p className="text-xl leading-7 text-muted-foreground">
              Start your learning experience here at MTN
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
