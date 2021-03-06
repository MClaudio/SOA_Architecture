import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CuentaComponent,
    ConfiguracionComponent,
    InicioComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    
  ],
  exports: [
    CuentaComponent,
    ConfiguracionComponent,
    InicioComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
