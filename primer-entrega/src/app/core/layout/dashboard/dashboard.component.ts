import { Component } from '@angular/core';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {MatDrawerContainer, MatDrawer} from "@angular/material/sidenav";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ListaAlumnosComponent} from "../../../features/alumnos/components/lista-alumnos/lista-alumnos.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatDrawerContainer,
    MatDrawer,
    NavbarComponent,
    ListaAlumnosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showFiller = false;
}
