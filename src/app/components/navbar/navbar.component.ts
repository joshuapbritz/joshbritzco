import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input() modal: ModalComponent;

  public showMenu: boolean = false;

  public scrolled: boolean = false;

  private get element(): HTMLElement {
    return this.el.nativeElement;
  }

  constructor(private router: Router, private el: ElementRef) {
    this.checkScrollPosition();
    this.addScrollListener();
  }

  public ngOnInit(): void {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.close();
      }
    });
  }

  public ngOnDestroy(): void {
    if (!!this.subscription && !!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public close(): void {
    this.showMenu = false;
  }

  public href(link: string): void {
    this.router.navigate([link]);
    this.close();
  }

  public checkScrollPosition(): void {
    if (window.scrollY > 10) {
      this.element.classList.add('scrolled');
    } else {
      this.element.classList.remove('scrolled');
    }
  }

  public addScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
  }

  public contact(): void {
    this.modal.open();
  }
}
