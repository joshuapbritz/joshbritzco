import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import copytext from 'src/app/common/helpers/copytext';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-terminal-snippet',
  templateUrl: './terminal-snippet.component.html',
  styleUrls: ['./terminal-snippet.component.scss'],
})
export class TerminalSnippetComponent implements OnInit {
  @ViewChild('hostel') private host: ElementRef<HTMLElement>;
  constructor(private toast: ToastService) {}

  ngOnInit() {}

  @HostListener('click') public onclick() {
    copytext(this.host.nativeElement.textContent);
    this.toast.show({ message: 'Command has been copied to your clipboard' });
  }
}
