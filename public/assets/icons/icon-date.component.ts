import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'icon-date',
  template: `
    <svg
      [ngStyle]="{'width': width, 'height': height}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        [attr.fill]="color" 
        d="M11.23 14.154v-1.538h1.54v1.538zm-4 0v-1.538h1.54v1.538zm8 0v-1.538h1.54v1.538zm-4 3.846v-1.538h1.54V18zm-4 0v-1.538h1.54V18zm8 0v-1.538h1.54V18zM4 21V5h3.385V2.77h1.077V5h7.154V2.77h1V5H20v16zm1-1h14v-9.384H5z"
      />
    </svg>
  `,
  imports: [NgStyle],
  styleUrls: [],
})
export class IconDateComponent {
  @Input() color: string = 'currentColor';
  @Input() width: string = '1rem';
  @Input() height: string = '1rem';
}
