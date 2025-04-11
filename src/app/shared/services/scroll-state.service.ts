import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  private trendingScrollState = signal(0);

  setTrendingScrollState(scrollTop: number) {
    this.trendingScrollState.set(scrollTop);
  }

  getTrendingScrollState() {
    return this.trendingScrollState();
  }

}
