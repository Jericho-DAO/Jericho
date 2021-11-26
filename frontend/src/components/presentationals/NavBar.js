import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { NavLink } from "react-router-dom";
import logo from "../../images/Logo.png";

const navigation = [
  { name: 'Summon', href: 'summon', current: true },
  { name: 'Register', href: 'register', current: false },
]
                        // className={isActive => ({
                        //   isActive ? 'bg-gray-900 text-white px-3 py-2 rounded-md font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
                        // })}

                        // className={classNames(
                        //   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        //   'px-3 py-2 rounded-md font-medium'
                        // )}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function displayAddress(account) {
  let displayAddress = "";
  if (account !== "") {
    const firstLetters = account?.slice(0, 6);
    const lastLetters = account?.slice(-4);

    displayAddress = `${firstLetters}...${lastLetters}`;
  }
  return displayAddress
}

export function NavBar({ connectWallet, account }) {
  return (
    <Disclosure as="nav" className="bg-black text-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 pt-4">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={''}>
                  <img
                    className="h-16 w-16"
                    src={logo}
                    alt="logo"
                  />
                </NavLink>
                <div className="flex-shrink-0 flex items-center">
                  <div className="hidden sm:block sm:ml-6 space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={item => {
                          const base = 'px-3 py-2 rounded-md text-lg font-medium '
                          const style = item.isActive ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white'

                          return base + style;
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect Wallet */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className="inline-flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  type="button"
                  onClick={connectWallet}
                >
                  {account === undefined ? "Connect" : displayAddress(account)}
                </button>
              </div>

            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
