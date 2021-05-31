import { Injectable } from '@angular/core';

interface IPostOrPutPost {
  id: string | undefined;
  methode: 'POST' | 'PUT';
  title: string | undefined;
  description: string | undefined;
  showPopUp: boolean;
}

@Injectable()
export class PostOrUpdateService {
  public data: IPostOrPutPost = {
    id: undefined,
    title: undefined,
    description: undefined,
    methode: 'POST',
    showPopUp: false,
  };

  toggleShowPopUp() {
    this.data.showPopUp = !this.data.showPopUp;
  }
}
