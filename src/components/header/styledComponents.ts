import styled from 'styled-components'

type LogoutButtonProps = {
  $isDark: boolean
}

type ThemeToggleButtonProps = {
  $isDark: boolean
}

type HeaderProps = {
  $isDark: boolean
}

const RightSectionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const LogoutButton = styled.button<LogoutButtonProps>`
  padding: 6px 12px;
  border: 1px solid ${props => (props.$isDark ? '#ffffff' : '#3b82f6')};
  background: transparent;
  color: ${props => (props.$isDark ? '#ffffff' : '#3b82f6')};
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
`

const ProfileImg = styled.img`
  width: 32px;
  border-radius: 50%;
`

const LogoImg = styled.img`
  width: 120px;
  cursor: pointer;
`

const ThemeToggleButton = styled.button<ThemeToggleButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => (props.$isDark ? '#fff' : '#000')};
`

const NavBar = styled.nav<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${props => (props.$isDark ? '#181818' : '#ffffff')};
  border-bottom: 1px solid ${props => (props.$isDark ? '#383838' : '#e2e8f0')};
`

export { RightSectionDiv, LogoutButton, ProfileImg, LogoImg, ThemeToggleButton, NavBar }