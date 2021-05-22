import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Content } from 'src/app/content.model';
import { ContentService } from 'src/app/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  readonly SPEED = 80;
  readonly DELAY_DESCRIPTION = 1000;
  title = '';
  subtitle = '';
  content: Content;
  isTypewriterDone = false;
  destroy = new Subject();

  constructor(private contentService: ContentService) {
    this.contentService.getData().then((content) => {
      this.content = content;
      this.initTypewriter();
    });
  }

  initTypewriter(): void {
    const titleChars = this.content.title.split('');
    const subtitleChars = this.content.subtitle.split('');
    timer(0, this.SPEED)
      .pipe(take(titleChars.length))
      .subscribe(() => (this.title += titleChars.shift()));
    const delay =
      this.content.title.length * this.SPEED + this.DELAY_DESCRIPTION;
    timer(delay, this.SPEED)
      .pipe(take(subtitleChars.length))
      .subscribe({
        next: () => (this.subtitle += subtitleChars.shift()),
        complete: () => (this.isTypewriterDone = true),
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
