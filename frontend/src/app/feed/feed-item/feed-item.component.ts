import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';
import {FeedProviderService} from "../services/feed.provider.service";

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: FeedItem;

  constructor(private feedService: FeedProviderService) {}

  ngOnInit() {}

  async incrementLike() {
    this.feedItem.likeCount++
    try {
      await this.feedService.incrementLikeCounter(this.feedItem.id)
    } catch (e) {
      this.feedItem.likeCount--
    }
  }
}
