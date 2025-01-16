import { Component, Input } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
    selector: 'icon-add',
    template: `
       <svg [ngStyle]="{'width': width, 'height': height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path [attr.fill]="color" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/>
       </svg>
    `,
    imports: [
        NgStyle
    ],
    styleUrls: []
})
export class IconAddComponent {
    @Input() color: string = 'currentColor';
    @Input() width: string = '1rem';
    @Input() height: string = '1rem';
}