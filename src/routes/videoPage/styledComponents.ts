import styled from 'styled-components'

type ButtonProps = {
  $isActive: boolean
  $isDark: boolean
}

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.$isActive ? (props.$isDark ? '#3b82f6' : '#2563eb') : '#64748b'};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 500;
  padding: 0;
`

export const ButtonText = styled.span`
`

export default MainDiv