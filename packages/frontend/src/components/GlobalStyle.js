import { createGlobalStyle } from 'styled-components';

import CloseBtn from '../images/close-btn.svg';
import { COLORS } from '../utils/theme';

export default createGlobalStyle`
  * {
        box-sizing: inherit;
    }

   #root {
        min-height: 100vh;
        position: relative;
   }
   html {
        box-sizing: border-box;
        min-height: 100vh;
        height: auto !important;

        body {
            margin: 0;
            padding: 0;
            min-height: 100vh !important;

            background: #111111;
            position: relative;
            color: #72727A;
            font-size: 14px !important;
            -webkit-overflow-scrolling: touch;
        }
   }

    a {
        color: #0072ce;
    }

    a:hover {
        color: #0072ce;
        text-decoration: underline;
    }

    .link {
        color: #0072ce;
        cursor: pointer;
        background-color: transparent;
        outline: none;
        border: 0;

        @media (min-width: 768px) {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .underline {
        text-decoration: underline;
    }

    body, p, h1, h2, h3, h4, h5, h6, button, .button, input, select, textarea {
        font-family: "Inter", Lato, "Lucida Grande", Tahoma, Sans-Serif;
    }

    .font-monospace {
        font-family: 'IBM Plex Mono', monospace;
    }

    .text-center {
        text-align: center;
    }

    h1, .h1 {
        font-weight: 900;
        color: ${COLORS.white};
        font-size: calc(22px + (30 - 22) * ((100vw - 300px) / (1600 - 300)));
        word-wrap: break-word;

        @media (max-width: 300px) {
            h1 {
                font-size: 22px;
            }
        }

        .symbol {
            font-weight: 900 !important;
        }
    }
    h2, .h2 {
        font-size: 24px;
        font-weight: 900;
        color: ${COLORS.lightText};
        margin: 0;

        b {
            color: #3F4045;
        }
    }
    h3, .h3 {
        font-size: 20px;
        font-weight: 900;
        color: ${COLORS.lightText};
        margin: 0;
    }
    h4, .h4 {
        font-size: 16px;
        font-weight: 500;
        color: ${COLORS.lightText}
        margin: 0;

        &.small {
            color: #72727A;
            font-size: 14px;
            font-weight: 400;
        }
    }

    h5, .h5 {
        font-size: 13px !important;
        font-weight: 500;
        color: #999999 !important;
        margin: 0;
    }

    h6, .h6 {
        font-size: 12px;
        font-weight: 500;
        color: #999999;
        margin: 0;
    }

    .font-small {
        font-size: 12px !important;
        color: #999 !important;
        font-weight: 400 !important;

        a {
            font-size: 12px !important;
            color: #999 !important;
            font-weight: 500 !important;
        }

        a:hover {
            color: #999 !important;
        }
    }

    .animated-dots {
        :after {
            content: '.';
            animation: link 1s steps(5, end) infinite;
        
            @keyframes link {
                0%, 20% {
                    color: rgba(0,0,0,0);
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                40% {
                    color: #4a4f54;
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                60% {
                    text-shadow:
                        .3em 0 0 #4a4f54,
                        .6em 0 0 rgba(0,0,0,0);
                }
                80%, 100% {
                    text-shadow:
                        .3em 0 0 #4a4f54,
                        .6em 0 0 #4a4f54;
                }
            }
        }
    }

    //Navbar styles
      .nav-links{
          a{
              text-decoration: none;
          }
      }

    input, .react-phone-number-input__input {
        font-size: 16px;
        width: 100%;
        height: 48px;
        border: 2px solid ${COLORS.darkGray};
        padding: 0 0 0 15px;
        color: ${COLORS.lightText};
        font-weight: normal;
        position: relative;
        margin-top: 8px;
        outline: none;
        appearance: none;
        border-radius: 8px;
        background-color: ${COLORS.darkGray};

        ::placeholder {
            color: ${COLORS.lightText};
        }

        :focus {
            border-color: ${COLORS.green};
            color: ${COLORS.lightText};
        }

        &.stake-amount-input,
        &.send-amount-input {
            font-size: 38px;
            margin: 0;
            font-weight: 600;
            height: 62px;
            color: #24272A;

            ::placeholder {
                color: #CCCCCC;
                opacity: 1;
            }

            &.error {
                color: #ff585d;
            }
        }

        &.problem {
            border: 2px solid #ff585d;

            &:focus {
                box-shadow: 0 0 0 2pt ${COLORS.red};
            }
        }

        &.success {
            border: 2px solid ${COLORS.green};

            &:focus {
                box-shadow: 0 0 0 2pt ${COLORS.darkGray};
            }
        }


    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }

    .input-validation-label {
        font-weight: 500;
        margin-top: 10px;

        &.success {
            color: #00C08B;
        }

        &.error {
            color: #ff585d;
        }
    }

    .input-label {
        font-size: 14px;
        color: #72727A;
        margin-bottom: 8px;
    }

    textarea {
        border: 2px solid #E5E5E6;
        border-radius: 8px;
        width: 100%;
        padding: 14px;
        line-height: 180%;
        font-size: 16px;
        ::placeholder {
            color: #A2A2A8;
        }
    }

    .input-sub-label {
        font-size: 12px;
        font-style: italic;
        text-align: left;
        margin-top: 10px;
    }

    .spinner {
        margin-right: 10px !important;
        :before,
        :after {
            top: 28px !important;
            width: 24px !important;
            height: 24px !important;
        }
    }
    .problem > .input > input,
    .problem > .input > input:focus,
    .problem > input {
        border: 2px solid #ff585d;
    }


    .success > .input > input,
    .success > .input > input:focus,
    .success > input {
        border: 2px solid #00C08B;
        color: ${COLORS.green};
    }

    b {
        font-weight: 600 !important;
    }

    .color-seafoam-blue {
        color: #6ad1e3 !important;
    }
    .color-blue {
        color: #0072ce !important;
    }
    .color-brown-grey {
        color: #999;
    }
    .color-charcoal-grey {
        color: #4a4f54 !important;
    }
    .color-black {
        color: #24272a !important;

        :hover {
            color: #24272a;
        }
    }
    .color-red {
        color: #ff585d !important;
    }
    .color-green {
        color: #00C08B !important;
    }

    .ui.popup > .header {
        font-weight: 600 !important;
        color: #24272a !important;
    }

    .border-bottom {
        border-bottom: 2px solid #f8f8f8 !important;
    }
    .border-bottom-bold {
        border-bottom: 4px solid #e6e6e6 !important;
    }
    .border-bottom-light {
        border-bottom: 1px solid #f8f8f8 !important;
    }

    .border-top {
        border-top: 2px solid #f8f8f8 !important;
    }

    .border-top-bold {
        border-top: 4px solid #e6e6e6 !important;
    }
    .border-top-light {
        border-top: 1px solid #f8f8f8 !important;
    }

    .border-left-bold {
        border-left: 4px solid #f8f8f8 !important;
    }


    .border-right {
        border-right: 2px solid #e6e6e6;
    }
    .border-right-light {
        border-right: 1px solid #e6e6e6;
    }
    .background-lg {
        background: #f8f8f8;
    }


    button, .button {
        cursor: pointer;
        outline: none;
    }

    .box {
        border: 2px solid #e6e6e6;
        border-radius: 8px;
        margin-bottom: 0;
        position: relative;
        min-height: 100px;
        position: relative;

        .row {
            padding: 0px !important;
        }
        .column {
            padding: 16px 18px !important;
            word-wrap: break-word;
        }
        .segment {
            padding: 30px 0 20px 0 !important;
        }
        .list {
            > .item {
                > img {
                    top: -4px;
                    margin: 0 10px;
                }
                > img.transarrow {
                    width: 11px !important;
                }
            }
            > h5.item {
                top: -4px;
            }
        }
    }


    .copy-image {
        width: 18px !important;
        margin: 0 10px 0 0 !important;
        top: -4px !important;
    }


    .balance-image {
        font-size: 20px !important;
        font-weight: 100 !important;

        &-big {
            font-size: 32px !important;
            font-weight: 100 !important;
        }
    }


    .transactions-block .item {
        margin-left: 10px !important;
    }


    .hide {
        display: none !important;
    }


    .App-section {
        width: 860px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .App-error-message {
        width: 100%;
        text-align: center;
        display: inline-block;
        margin: auto;
    }

    .ui.popup>.header, .ui.popup {
        color: white;
    }
    .ui.popup {
        border: 0;
        background-color: #292526;

        :before {
            display: none;
        }
    }
    .ui.left.center.popup:before {
        box-shadow: 1px -1px 0 0 #eee;
    }
    .ui.top.center.popup:before {
        box-shadow: 1px 1px 0 0 #eee;
    }
    .ui.bottom.right.popup:before {
        box-shadow: -1px -1px 0 0 #eee;
    }

    @media screen and (max-width: 767px) {
        h2, .h2 {
            font-size: 20px;
            font-weight: 900;
            margin: 0;
        }
        .box .column {
            padding: 16px 18px !important;
        }
    }

    .ui {
        &.dimmer {
            .modal {
                line-height: 140%;
                padding: 25px;

                .close {
                    top: 10px !important;
                    right: 10px !important;
                    background: url(${CloseBtn}) center no-repeat;
                    background-size: 200%;
                    height: 25px;
                    width: 25px;
                    padding: 0;
                    margin: 0;

                    :before {
                        display: none;
                    }
                }
            }
        }
    }

    .tooltip {
        a {
            color: inherit;
            font-style: italic;
    
            :hover {
                color: inherit;
                text-decoration: underline;
            }
        }
    }

    .send-theme {

        > button {
            width: 100%;
        }

        .header-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 30px 0 10px 0;

            h4 {
                margin: 0;
            }

            button {
                margin: 0 !important;
                width: auto !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                text-transform: capitalize !important;
            }
        }

        .arrow-circle {
            display: block;
            margin: 50px auto 20px auto;
        }

        .ui {
            &.input {
                width: 100%;
                margin-top: 10px;
            }
        }
    }

    .recaptcha-widget {
        display: flex;
        justify-content: center;
    }

    .grecaptcha-badge { 
        visibility: hidden;
    }

    .recaptcha-disclaimer {
        margin: 20px 0 0 0;
        color: #72727A;
        text-align: center;

        a {
            color: #3f4045;
        }
    }

    .pg {
        &-20 {
            padding: 20px;
        }
    }

    .br {
        &-1-grey {
            border: 1px solid #F0F0F1;
        }
    }

    .brs {
        &-8 {
            border-radius: 8px;
        }
    }

    .bsw {
        &-l {
            box-shadow: 0 45px 56px 0 rgba(0,0,0,0.07),
              0 10.05px 12.51px 0 rgba(0,0,0,0.0417),
              0 2.99px 3.72px 0 rgba(0,0,0,0.0283);
        }
    }

    .flex-center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a{
        text-decoration:none;
    }
`;
