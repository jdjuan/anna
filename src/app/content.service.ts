import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createClient } from 'contentful';
import { Content } from 'src/app/content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private cdaClient = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken,
  });

  constructor() {}

  async getData(): Promise<Content> {
    return (
      await this.cdaClient.getEntry<Content>(environment.contentful.entryId)
    ).fields;
  }
}
