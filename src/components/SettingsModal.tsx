import { IconX } from '@tabler/icons-react'
import { Modal, ModalProps } from './Modal'
import ThemeSwitch from './ThemeSwitch'

type SettingsModalProps = Omit<ModalProps, 'children'>

export default function SettingsModal({ ...modalProps }: SettingsModalProps) {
  return (
    <Modal {...modalProps}>
      <div className='modal-title'>
        <div>Settings</div>
        <button
          type='button'
          title='Close'
          className='close-btn'
          onClick={modalProps.onClose}>
          <IconX />
        </button>
      </div>
      <div className='form-group'>
        <label htmlFor='theme-switch'>Theme</label>
        <ThemeSwitch />
      </div>
      
    </Modal>
  )
}
