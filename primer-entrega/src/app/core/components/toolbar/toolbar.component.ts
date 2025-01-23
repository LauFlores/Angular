import {Component, Input} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatBadgeModule,
    MatDrawer
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer;
}
