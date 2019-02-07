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
    return this._snippet;
  }
  public set snippet(value: string) {
    this._snippet = value;
  }
  private _snippet: string;

  public snippetCode: string;

  @Input() public lang: string;
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

  private handleHTML(string: string): string {
    return `<pre>${Prism.highlight(
      string,
      Prism.languages.html,
      'html'
    )}</pre>`;
  }

  private handleJS(string: string): string {
    return `<pre>${Prism.highlight(string, Prism.languages.javascript)}</pre>`;
  }

  private handleCSS(string: string): string {
    return `<pre>${Prism.highlight(string, Prism.languages.css)}</pre>`;
  }

  private handleDEFAULT(string: string): string {
    return string;
  }

  @HostListener('click') public onclick() {
    copytext(this.snippet);
    this.toast.show({ message: 'Code has been copied to your clipboard' });
  }
}
