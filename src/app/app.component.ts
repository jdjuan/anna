import { Component, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  readonly SPEED = 100;
  readonly DELAY_DESCRIPTION = 1000;
  title = '';
  fullTitle = 'Anna Mikulics'.split('');
  description = '';
  fullDescription = 'Creative and Scientific Writing.'.split('');
  destroy = new Subject();

  constructor() {
    this.initTypewriter();
  }

  initTypewriter(): void {
    timer(0, this.SPEED).pipe(
      take(this.fullTitle.length),
      tap(() => (this.title += this.fullTitle.shift())),
      takeUntil(this.destroy)
    ).subscribe();
    const delay = this.fullTitle.length * this.SPEED + this.DELAY_DESCRIPTION;
    timer(delay, this.SPEED).pipe(
      take(this.fullDescription.length),
      tap(() => (this.description += this.fullDescription.shift())),
      takeUntil(this.destroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
