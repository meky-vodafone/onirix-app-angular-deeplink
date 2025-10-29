import { Component, inject, signal } from '@angular/core';
// import { OnirixService } from './onirix.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule,]
})
export class AppComponent {
  // private onirixService = inject(OnirixService);

  // private router = inject(Router);


  // link: string = 'https://671258921252.ngrok-free.app'; // input value bound to input field
  // hideContent = signal(false)
  ngOnInit() {
    // this.onirixService.init();
    // const currentUrl = window.location.href;
    // if (currentUrl.includes('.ngrok-free.app')) {
    //   this.hideContent.set(true)
    // }
  }
}
