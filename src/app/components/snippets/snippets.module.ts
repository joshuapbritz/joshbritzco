import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { TerminalSnippetComponent } from './terminal-snippet/terminal-snippet.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeSnippetComponent, TerminalSnippetComponent],
  exports: [CodeSnippetComponent, TerminalSnippetComponent],
})
export class AppSnippets {}
