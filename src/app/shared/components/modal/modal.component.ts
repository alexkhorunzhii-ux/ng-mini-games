import { ChangeDetectionStrategy, Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  closed = output<void>();

  private modal = viewChild.required<ElementRef<HTMLDialogElement>>('modal');

  open(): void {
    this.modal().nativeElement.showModal();
  }

  close(): void {
    this.modal().nativeElement.close();
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.modal().nativeElement) {
      this.close();
    }
  }
}
