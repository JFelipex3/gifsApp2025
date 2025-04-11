import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
//import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivref = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivref()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivref()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    //console.log({ scrollTotal: scrollTop + clientHight, scrollTop: scrollTop, clientHight: clientHight, scrollHeight: scrollHeight});
    const isAtBottom = scrollTop + clientHight + 300 >= scrollHeight;
    this.scrollStateService.setTrendingScrollState(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
