import { Directive, ElementRef, Renderer2, OnInit, Input, OnChanges } from '@angular/core';
@Directive({
  selector: '[appVowelHighlight]',
  standalone: true
})
export class VowelHighlightDirective  implements OnChanges {
  @Input('appVowelHighlight') text: string = ''; // Recibe el texto como un input

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.highlightIfStartsWithVowel();
  }

  ngOnChanges() {
    this.highlightIfStartsWithVowel();
  }

private highlightIfStartsWithVowel() {
    if (this.text && this.startsWithVowel(this.text)) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'blue'); // Cambia 'blue' por el color que desees
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }

  private startsWithVowel(text: string): boolean {
    return /^[aeiouáéíóúAEIOUÁÉÍÓÚ]/.test(text);
  }
}