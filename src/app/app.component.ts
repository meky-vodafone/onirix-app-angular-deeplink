import { Component, inject } from '@angular/core';
import { OnirixService } from './onirix.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private onirixService = inject(OnirixService);

  ngOnInit() {
    this.onirixService.init();
  }
}
