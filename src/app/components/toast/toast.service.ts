import { ToastComponent } from './toast.component';
import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';

@Injectable()
export class ToastService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  show(options: ToastOptions) {
    this.renderToastInBody(options);
  }

  private renderToastInBody(options: ToastOptions): void {
    const defaults = { showFor: 5000, ...options };
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ToastComponent)
      .create(this.injector) as ComponentRef<ToastComponent>;

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.message = options.message;

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    // return componentRef;
    setTimeout(() => {
      componentRef.instance.detach().then(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });
    }, defaults.showFor);
  }
}

interface ToastOptions {
  message: string;
  showFor?: number;
}
