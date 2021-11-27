import React, { useState, Fragment } from "react"
import { Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

export function WaitingForTransactionMessage({ message, dismiss }) {

  const [show, setShow] = useState(true)

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:pt-24 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="py-2 px-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 m-auto"></div>
                  </div>
                  <div className="ml-3 w-0 flex-auto pt-0.5">
                    <p className="font-medium text-gray-900">Transaction sent</p>
                    <p className="text-sm text-gray-500">
                      Waiting for transaction to be mined
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
