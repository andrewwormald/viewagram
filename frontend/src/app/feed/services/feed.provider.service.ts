import { Injectable } from '@angular/core';
import { FeedItem, feedItemMocks } from '../models/feed-item.model';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../../api/api.service';
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FeedProviderService {
  currentFeed$: BehaviorSubject<FeedItem[]> = new BehaviorSubject<FeedItem[]>([]);

  constructor(
      private api: ApiService,
      private auth: AuthService,) { }

  async getFeed(): Promise<BehaviorSubject<FeedItem[]>> {
    const req = await this.api.get('/feed');
    const items = <FeedItem[]> req.rows;
    this.currentFeed$.next(items);
    return Promise.resolve(this.currentFeed$);
  }

  async incrementLikeCounter(id: number): Promise<boolean> {
    await this.api.post(`/feed/${id}/like`, null);
    return Promise.resolve(true);
  }

  async getUserFeed(): Promise<BehaviorSubject<FeedItem[]>> {
    const req = await this.api.get(`/feed/user/${this.auth.currentUser$.getValue().email}`);
    const items = <FeedItem[]> req.rows;
    this.currentFeed$.next(items);
    return Promise.resolve(this.currentFeed$);
  }

  async uploadFeedItem(caption: string, file: File): Promise<any> {
    const res = await this.api.upload('/feed', file, {
      caption: caption,
      url: file.name,
      userEmail: this.auth.currentUser$.getValue().email
    });
    const feed = [res, ...this.currentFeed$.value];
    this.currentFeed$.next(feed);
    return res;
  }

}
