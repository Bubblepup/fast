/* eslint-disable */
import { html } from "lit";
import * as Components from "./components";
Components;

export function myTemplate() {
    return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>FAST SSR Demo</title>
            </head>
            <body>
                <fast-main>child content</fast-main>
                <fast-slot>Light dom slotted leaf<fast-leaf></fast-slot></fast-leaf>
            </body>
        </html>
    `;
}