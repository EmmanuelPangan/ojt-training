import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import { CustomPipe } from './custom.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';






@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    CustomPipe,
    HeaderComponent,
    FooterComponent




  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
