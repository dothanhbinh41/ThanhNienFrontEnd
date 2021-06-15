import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <main class="content"><router-outlet></router-outlet></main>`,
  styles: [
    `
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      @keyframes spinner {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner:before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        border-top-color: #000000;
        animation: spinner 0.8s linear infinite;
      }
    `,
  ],
})
export class AppComponent {}
