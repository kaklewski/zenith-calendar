import { IconX } from '@tabler/icons-react'
import { Modal, ModalProps } from './Modal'
import ThemeSwitch, { ThemeSwitchType } from './ThemeSwitch'
import { FirstDaySwitch, FirstDaySwitchType } from './FirstDaySwitch'

type SettingsModalProps = Omit<ModalProps, 'children'> &
  ThemeSwitchType &
  FirstDaySwitchType

export default function SettingsModal({
  theme,
  setTheme,
  firstDayOfWeek,
  setFirstDayOfWeek,
  ...modalProps
}: SettingsModalProps) {
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
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
      <div className='form-group'>
        <label htmlFor='first-day-switch'>First Day of The Week</label>
        <FirstDaySwitch
          firstDayOfWeek={firstDayOfWeek}
          setFirstDayOfWeek={setFirstDayOfWeek}
        />
      </div>
    </Modal>
  )
}
