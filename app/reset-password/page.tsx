import { ResetPasswordForm } from "@/components/features/intern/reset-password/reset-password-form";

import Image from "next/image";

import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <main>
      <section className="my-10 mx-[5%]">
        <div className="max-w-lg mx-auto">
          <header className="flex flex-col items-center gap-2 mb-10">
            <Image
              src="/assets/images/https_.png"
              alt=""
              width={116}
              height={116}
              priority
            />
            <h2 className="font-medium text-xl leading-7 mb-1">
              Create new password
            </h2>
            <p className="text-sm leading-5 text-muted-foreground">
              Enter your new password below.
            </p>
          </header>
          <Suspense fallback={<p>Loading...</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
