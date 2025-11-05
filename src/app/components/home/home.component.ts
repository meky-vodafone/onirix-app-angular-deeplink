import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  caughtCharacter: boolean | null = null;
  time: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;

    // ✅ Check if there are any query params
    if (Object.keys(params).length > 1) {
      console.log('Raw query params:', params);

      // Convert from string to proper types
      this.caughtCharacter =
        params['caughtCharachter'] === 'true'
          ? true
          : params['caughtCharachter'] === 'false'
          ? false
          : null;

      this.time = params['time'] === 'null' ? null : params['time'];

      console.log('caughtCharacter:', this.caughtCharacter);
      console.log('time:', this.time);

      // ✅ Only alert if params exist
      alert(`caught: ${this.caughtCharacter} & time=${this.time}`);
    }
  }
}
