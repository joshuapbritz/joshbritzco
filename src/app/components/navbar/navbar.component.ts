import { Component, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterContentInit {
  public show_menu: boolean = false;
  public scrolled: boolean = false;
  private element: HTMLElement;
  private blur: HTMLElement;
  constructor(private router: Router, private _el: ElementRef) {
    this.element = _el.nativeElement;
    this.checkScrollPosition();
    this.addScrollListener();
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.blur = document.getElementById('blur');
  }

  toggle_menu() {
    this.blur.classList.toggle('blur');
    this.show_menu = !this.show_menu;
  }

  close() {
    this.show_menu = false;
    this.blur.classList.remove('blur');
  }

  href(link: string) {
    this.router.navigate([link]);
    this.close();
  }

  checkScrollPosition() {
    if (window.scrollY > 10) {
      this.element.classList.add('scrolled');
    } else {
      this.element.classList.remove('scrolled');
    }
  }

  addScrollListener() {
    window.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
  }
}
