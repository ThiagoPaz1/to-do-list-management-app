import { useState, MouseEvent } from 'react'
import { Menu, MenuItem, Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Types
import { ProfileProps } from '../types'

// Styles and images
import styles from '../styles/profile.module.css'

export function Profile({ userName }: ProfileProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  function handleLogout() {
    localStorage.setItem('userDataSession', '')
    navigate('/login')
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className={styles.containerProfile}>
      <Button
         id="basic-button"
         aria-controls={open ? 'basic-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         onClick={handleClick} 
      >
        <h4 className={styles.userName}>
          {userName}
        </h4>
        <AccountCircle color="primary" fontSize="large" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout} sx={{width: '120px'}}>
            <Logout fontSize="small" />
            <h4 className={styles.logoutMenuOption}>
              Sair
            </h4>
        </MenuItem>
      </Menu>
    </div>
  )
}