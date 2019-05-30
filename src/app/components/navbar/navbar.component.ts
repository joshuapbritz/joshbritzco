import { Component, OnInit, ElementRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterContentInit {
  @Input() modal: ModalComponent;
  public showMenu: boolean = false;
  public scrolled: boolean = false;
  private element: HTMLElement;
  private blur: HTMLElement;
  constructor(private router: Router, private el: ElementRef) {
    this.element = this.el.nativeElement;
    this.checkScrollPosition();
    this.addScrollListener();
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.blur = document.getElementById('blur');
  }

  toggle_menu() {
    this.showMenu = !this.showMenu;
  }

  close() {
    this.showMenu = false;
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

  contact() {
    this.modal.open();
  }
}
