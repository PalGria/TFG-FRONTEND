import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MynavComponent } from './mynav/mynav.component';
import { ContentComponent } from './content/content.component';
import { PageJuegosComponent } from './page-juegos/page-juegos.component';

const appRoutes: Routes = [
  { path: 'games', component: PageJuegosComponent}
];  
@NgModule({


  declarations: [
    AppComponent,
    MynavComponent,
    ContentComponent,
    PageJuegosComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
