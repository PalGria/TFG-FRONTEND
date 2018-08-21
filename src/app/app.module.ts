import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MynavComponent } from './mynav/mynav.component';
import { ContentComponent } from './content/content.component';
import { PageJuegosComponent } from './page-juegos/page-juegos.component';
import { PageMetricasComponent } from './page-metricas/page-metricas.component';

const appRoutes: Routes = [
  { path: 'games', component: PageJuegosComponent},
  { path: 'games/:id', component: PageMetricasComponent}

];  
@NgModule({


  declarations: [
    AppComponent,
    MynavComponent,
    ContentComponent,
    PageJuegosComponent,
    PageMetricasComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
