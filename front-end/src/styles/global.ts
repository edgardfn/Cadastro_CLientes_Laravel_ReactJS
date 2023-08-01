import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['blue-react']};
    }

    body {
        background-color: ${(props) => props.theme['gray-800']};
        color: ${(props) => props.theme['gray-100']};
        -webkit-font-smoonthing: antialiased;
    }

    body, input, text-area, button, span {
        font: 400 1.4rem Roboto, sans-serif;
    }

    input {
        padding: 1rem;
        border-radius: 8px;
        border: none;
    }

    button {
        padding: 1rem 2.5rem;
        border-radius: 8px;
        border: none;
        color: ${(props) => props.theme['blue-react']};;
        background-color: ${(props) => props.theme['gray-800']};
        cursor: pointer;
    }

    button:hover {
        opacity: 0.7;
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

`
