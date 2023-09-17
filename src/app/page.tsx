import Link from "next/link";
import { buttonVariants } from "./components/ui/button";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col items-center ">
        <>
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400 text-transparent bg-clip-text">
                Track your finances, focus on what is important
              </h1>

              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Managing your money is now easier than ever. Visualize your
                budget in a quick and easy way.
              </p>
              <div className="space-x-4">
                <Link
                  href="/signin"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Features
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                We are passionate about quality, and here are the exceptional
                features that set us apart.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <path
                      fill="currentColor"
                      d="M22 21H2V3h2v12.54L9.5 6L16 9.78l4.24-7.33l1.73 1L22 21Z"
                    />
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Analyze spend trends</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your spending trends in real time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <path
                      fill="currentColor"
                      d="M11 14.825V18q0 .425.288.713T12 19q.425 0 .713-.288T13 18v-3.175l.9.9q.15.15.338.225t.375.063q.187-.013.362-.088t.325-.225q.275-.3.288-.7t-.288-.7l-2.6-2.6q-.15-.15-.325-.212T12 11.425q-.2 0-.375.063t-.325.212l-2.6 2.6q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288l.875-.875ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.588 1.413T18 22H6Zm7-14V4H6v16h12V9h-4q-.425 0-.713-.288T13 8ZM6 4v5v-5v16V4Z"
                    />
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Upload files</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically upload your transactions from your bank in
                      format CSV.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path
                        stroke-linecap="round"
                        d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"
                      />
                      <path d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829c-.205.262-.38.547-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-5.965 5.965c-.404.404-.606.606-.829.78a4.59 4.59 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9" />
                    </g>
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Edit uploaded transactions</h3>
                    <p className="text-sm text-muted-foreground">
                      You can also kick off the ones you don&apos;t want to.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    >
                      <path d="M6.286 19C3.919 19 2 17.104 2 14.765c0-2.34 1.919-4.236 4.286-4.236c.284 0 .562.028.83.08m7.265-2.582a5.765 5.765 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a5.577 5.577 0 0 1-.354-1.962C6.762 5.528 9.32 3 12.476 3c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.29 4.29 0 0 1 1.55.634m9.49-3.228C20.392 8.78 22 10.881 22 13.353c0 2.707-1.927 4.97-4.5 5.52" />
                      <path
                        stroke-linejoin="round"
                        d="M12 16v6m0-6l2 2m-2-2l-2 2"
                      />
                    </g>
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Upload transactions</h3>
                    <p className="text-sm text-muted-foreground">
                      Wanna take it slow and upload transactions one by one?
                      Well, that&apos;s on the table too!
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <g
                      fill="currentColor"
                      fill-rule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M9.25 9a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0ZM12 7.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5Zm0 4.5c-1.196 0-2.315.24-3.164.665c-.803.402-1.586 1.096-1.586 2.085v.063c-.002.51-.004 1.37.81 1.959c.378.273.877.448 1.495.559c.623.112 1.422.169 2.445.169s1.822-.057 2.445-.169c.618-.111 1.117-.286 1.495-.56c.814-.589.812-1.448.81-1.959V15c0-.99-.783-1.683-1.586-2.085c-.849-.424-1.968-.665-3.164-.665ZM8.75 15c0-.115.113-.421.757-.743c.6-.3 1.48-.507 2.493-.507s1.894.207 2.493.507c.644.322.757.628.757.743c0 .604-.039.697-.19.807c-.122.088-.373.206-.88.298c-.502.09-1.203.145-2.18.145c-.977 0-1.678-.055-2.18-.145c-.507-.092-.758-.21-.88-.298c-.152-.11-.19-.203-.19-.807Z" />
                      <path d="M8.723 2.051c1.444-.494 2.34-.801 3.277-.801c.938 0 1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23l.727-.25ZM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7.137 7.137 0 0 0-.864.404a1.648 1.648 0 0 0-.208.139a.386.386 0 0 0-.055.05a.409.409 0 0 0-.032.074c-.02.056-.042.136-.063.248a7.438 7.438 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.175 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.127 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7.423 7.423 0 0 0-.1-.958a1.738 1.738 0 0 0-.063-.248a.408.408 0 0 0-.032-.074a.385.385 0 0 0-.055-.05a1.64 1.64 0 0 0-.208-.14a7.135 7.135 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75Z" />
                    </g>
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Authentication using{" "}
                      <b className="underline">
                        <a href="https://supabase.com" target="_blank">
                          Supabase
                        </a>
                      </b>
                      , ensuring that your data within our platform are
                      protected.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 fill-current"
                  >
                    <path
                      fill="currentColor"
                      d="M10.5 15h3l-.575-3.225q.5-.25.788-.725T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .575.288 1.05t.787.725L10.5 15Zm1.5 7q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.263 6.913T12 22Zm0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"
                    />
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Your information is completely encrypted: every
                      transaction field is inaccessible to us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="open-source"
            className="container py-8 md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Powered by
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Flowinance is powered by{" "}
                <b className="hover:underline">
                  <a href="https://supabase.com" target="_blank">
                    Next.js
                  </a>
                </b>
                ,{" "}
                <b className="hover:underline">
                  <a href="https://supabase.com" target="_blank">
                    Supabase
                  </a>
                </b>{" "}
                and{" "}
                <b className="hover:underline">
                  <a href="https://supabase.com" target="_blank">
                    Shadcn.
                  </a>
                </b>
              </p>
            </div>
          </section>
        </>
      </main>
    </div>
  );
}
