import { Dialog } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { Modal, ModalProps } from '@/components/Modal'

export type LearnMoreModalProps = {
  title: string
} & ModalProps

export function LearnMoreModal ({ children, title, onClose, open }: LearnMoreModalProps) {
  return (
    <Modal onClose={onClose} open={open}>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <QuestionMarkCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {children}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
          onClick={onClose}
        >
          Go back to calculator
        </button>
      </div>
    </Modal>
  )
}
