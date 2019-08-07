import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  public constructor(private titleService: Title) {
    titleService.setTitle('stocks');
    this.title = 'stocks';
  }
}
