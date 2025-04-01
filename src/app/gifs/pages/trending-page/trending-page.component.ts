import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
//import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  gifService = inject(GifService);

  scrollDivref = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivref()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    console.log({ scrollTotal: scrollTop + clientHight, scrollTop: scrollTop, clientHight: clientHight, scrollHeight: scrollHeight});
    const isAtBottom = scrollTop + clientHight + 300 >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
