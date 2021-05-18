import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';



const routes: Routes = [
  { path: "", component: InicioComponent},
  { path: "cuenta", component: CuentaComponent},
  { path: "configuracion", component: ConfiguracionComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    ScrollingModule
  ],
  exports: [
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    ScrollingModule
  ]
})
export class AppRoutingModule { }
