import { inject, Injectable, signal } from '@angular/core';

import { FirestoreService } from './firestore-service';
import { Feed } from '../model/feed';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  
  firestore = inject(FirestoreService);

  news = signal<News[]>([]);


  constructor(){
    this.firestore.getUserFeeds().then(feeds => {
      // const firstFeed = feeds[0];
      // this.getNews(firstFeed)
      this.getNews(feeds)
    });
  }

  getNews(feeds: Feed[]) {

    const requests = [];

    for (const feed of feeds) {
      const request =
      fetch(feed.url)
      .then(async resp =>{
        const origin = feed.name;
        const xml = await resp.text();
        return {origin, xml};
      })
      .catch(err => "");

      requests.push(request);
    }

    Promise.all(requests).then(res => 
      this.parseRss(res));

    };
  

  parseRss(responses: any[]): any {
    const latestNews: News[] = [];
    

    for (const response of responses) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.xml, 'application/xml');  
      const items = xml.querySelectorAll('item');

      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const news: News = {
          title: element.querySelector('title')?.innerHTML!,
          description: element.querySelector('description')?.innerHTML!,
          url: element.querySelector('link')?.innerHTML!,
          origin: response.origin,
        };
        const dateString = element.querySelector('pubDate')?.innerHTML;
        if (dateString) {
          news.pubDate = new Date(dateString).toISOString();
        }
        latestNews.push(news);
      }
    }

    latestNews.sort((a, b) => {
      if (a.pubDate && b.pubDate) {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      } else {
        return 0;
      }
    });

    this.news.set(latestNews);
  }
}

