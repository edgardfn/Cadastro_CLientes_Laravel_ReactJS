import styled from 'styled-components'

export const InputDate = styled.input`
  width: 36%;
`

export const ButtonAddNewClient = styled.button`
  width: 36%;
  background-color: ${(props) => props.theme['gray-600']};
  margin-top: 2rem;
`

export const ContainerModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 1.5rem 1.5rem;

  svg {
    cursor: pointer;
  }

  svg:hover {
    color: #06d4f9;
  }
`
