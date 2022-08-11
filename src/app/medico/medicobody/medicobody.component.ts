import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medicobody',
  templateUrl: './medicobody.component.html',
  styleUrls: ['./medicobody.component.scss'],
})
export class MedicobodyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
