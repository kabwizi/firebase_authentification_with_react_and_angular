import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() tooltip: boolean | undefined;
  @Output() tooltipChange: EventEmitter<boolean> = new EventEmitter();

  public timer = setInterval(() => {
    this.tooltipChange.emit(false);
  }, 3000);

  ngOnInit() {
    if (this.tooltip) {
      this.timer;
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
