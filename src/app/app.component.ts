import { Component, inject } from '@angular/core';
import { OnirixService } from './onirix.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[FormsModule]
})
export class AppComponent {
  private onirixService = inject(OnirixService);
  link: string = ''; // input value bound to input field

  ngOnInit() {
    this.onirixService.init();
  }
}
