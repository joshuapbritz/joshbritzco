import { Component, OnInit, Input, HostListener } from '@angular/core';
import Prism from 'prismjs';
import copytext from 'src/app/common/helpers/copytext';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent implements OnInit {
  @Input()
  public get snippet(): string {
    return this.snippetValue;
  }
  public set snippet(value: string) {
    this.snippetValue = value;
  }
  private snippetValue: string;

  public snippetCode: string;

  @Input() public lang: string;
  @Input() public src: string;
  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.snippetCode = this.processLang(this.snippet);
  }

  private processLang(code: string): string {
    console.log(this.lang);

    switch (this.lang) {
      case 'javascript':
        return this.handleJS(code);
      case 'html':
        return this.handleHTML(code);
      case 'css':
        return this.handleCSS(code);
      default:
        return this.handleDEFAULT(code);
    }
  }

  private handleHTML(value: string): string {
    return `<pre>${Prism.highlight(value, Prism.languages.html, 'html')}</pre>`;
  }

  private handleJS(value: string): string {
    return `<pre>${Prism.highlight(value, Prism.languages.javascript)}</pre>`;
  }

  private handleCSS(value: string): string {
    return `<pre>${Prism.highlight(value, Prism.languages.css)}</pre>`;
  }

  private handleDEFAULT(value: string): string {
    return value;
  }

  @HostListener('click') public onclick() {
    copytext(this.snippet);
    this.toast.show({ message: 'Code has been copied to your clipboard' });
  }
}
