import { createGlobalStyle } from 'styled-components';

import './fontfaces.css'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    html {
        box-sizing: border-box;
        font-size: 62.5%; /* 1rem = 10px, 10px/16px = 62.5% */
    }

    body {

        font-family: 'avenir';
        font-weight: 300;

        /* background: ${({ theme }) => theme.colors.backgroundColor}; */
        background-color: rgb(30, 30, 30);
    }
    canvas {
        background-color: rgb(245, 245, 245);
        padding: 12px;
    }
`;
