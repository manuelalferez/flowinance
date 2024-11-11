"use client";
import { SignInButton } from "./sign-in-button";
import { AccountButton } from "./account-button";

export function Navbar({ session }: any) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-emerald-700 hover:text-emerald-600 font-logo font-extrabold text-2xl whitespace-nowrap dark:text-white">
            flowinance
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          {session && (
            <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center py-2 px-3 text-black hover:text-emerald-700 rounded md:bg-transparent md:p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    className="mr-1"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 1.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 2.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041A1.5 1.5 0 0 0 6.96 5.85c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6A1.5 1.5 0 0 0 5.85 1.04C5.676 1 5.48 1 5.25 1H2.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 0 1-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37ZM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 2.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6A1.5 1.5 0 0 0 9.15 6.96c.174.04.37.04.6.04h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.11-1.109c.04-.174.04-.37.04-.6v-2.5c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04H9.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 0 1-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37ZM2.75 8h2.5c.229 0 .426 0 .6.041A1.5 1.5 0 0 1 6.96 9.15c.04.174.04.37.04.6v2.5c0 .229 0 .426-.041.6a1.5 1.5 0 0 1-1.109 1.11c-.174.04-.37.04-.6.04h-2.5c-.229 0-.426 0-.6-.041a1.5 1.5 0 0 1-1.11-1.109c-.04-.174-.04-.37-.04-.6v-2.5c0-.229 0-.426.041-.6A1.5 1.5 0 0 1 2.15 8.04c.174-.04.37-.04.6-.04Zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 0 0-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 0 0 .37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 0 0 .37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 0 0-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8Zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 0 0 8.04 9.15c-.04.174-.04.37-.04.6v2.5c0 .229 0 .426.041.6a1.5 1.5 0 0 0 1.109 1.11c.174.041.371.041.6.041h2.5c.229 0 .426 0 .6-.041a1.5 1.5 0 0 0 1.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6a1.5 1.5 0 0 0-1.109-1.11c-.174-.04-.37-.04-.6-.04H9.8Zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 0 1 .37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 0 1-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 0 1-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 0 1 .37-.37Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className="flex items-center py-2 px-3 text-black hover:text-emerald-700 rounded md:bg-transparent md:p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    className="mr-1"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M8 2h4.5a.5.5 0 0 1 .5.5V5H8V2ZM7 5V2H2.5a.5.5 0 0 0-.5.5V5h5ZM2 6v3h5V6H2Zm6 0h5v3H8V6Zm0 4h5v2.5a.5.5 0 0 1-.5.5H8v-3Zm-6 2.5V10h5v3H2.5a.5.5 0 0 1-.5-.5Zm-1-10A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5v-10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Transactions
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center py-2 px-3 text-black hover:text-emerald-700 rounded md:bg-transparent md:p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    className="mr-1 h-4 w-4"
                  >
                    <path
                      fill="currentColor"
                      d="M9.8 21.75q-3.425-.775-5.613-3.5T2 12t2.188-6.25T9.8 2.25q.475-.125.838.175t.362.8q0 .35-.2.625t-.55.35Q7.5 4.825 5.75 7T4 12t1.75 5t4.5 2.8q.35.075.55.35t.2.625q0 .5-.362.8t-.838.175m4.4 0q-.475.125-.837-.175t-.363-.8q0-.35.2-.625t.55-.35q.675-.15 1.313-.413t1.212-.637q.275-.2.613-.15t.587.3q.35.35.3.813t-.45.737q-.725.45-1.513.775t-1.612.525m4.7-4.25q-.25-.25-.3-.587t.15-.613q.375-.575.638-1.225t.412-1.325q.075-.35.35-.537t.625-.188q.5 0 .8.363t.175.837q-.2.825-.525 1.613t-.775 1.512q-.275.4-.737.45t-.813-.3m1.875-6.5q-.35 0-.625-.2t-.35-.55q-.15-.675-.413-1.312t-.637-1.213q-.2-.3-.15-.637t.3-.588q.35-.35.813-.3t.737.475q.45.725.775 1.513T21.75 9.8q.125.475-.175.838t-.8.362m-4.5-5.75q-.575-.375-1.212-.638T13.75 4.2q-.35-.075-.55-.35t-.2-.625q0-.5.363-.8t.837-.175q.825.2 1.613.525t1.512.775q.425.275.475.738t-.3.812q-.25.25-.587.3t-.638-.15M11.975 17q-.425 0-.712-.288T10.975 16v-5.125l-1.875 1.9q-.3.3-.712.3t-.713-.3t-.312-.712t.287-.713l3.625-3.65q.275-.275.7-.275t.7.275l3.575 3.575q.3.3.313.725t-.288.725t-.725.3t-.725-.3l-1.85-1.85V16q0 .425-.287.713t-.713.287"
                    />
                  </svg>
                  Upload
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="/transactions/upload-ai"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Upload with AI
                      </a>
                    </li>
                    <li>
                      <a
                        href="/transactions/upload"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Upload
                      </a>
                    </li>
                    <li>
                      <a
                        href="/transactions/add"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Add one transaction
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>{session ? <AccountButton /> : <SignInButton />}</li>
            </ul>
          )}
          {!session && <SignInButton />}
        </div>
      </div>
    </nav>
  );
}
