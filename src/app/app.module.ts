import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import { CustomPipe } from './custom.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AppRoutingModule } from './app-routing.module';








@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    CustomPipe,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
