import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

@Injectable()
export class ServerRequestService {
  constructor(private http: HttpClient) {}

  getAllPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:5000/posts');
  }
  getAllPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>('http://localhost:5000/posts/' + id);
  }
  createNewPost(newPost: IPost): Observable<IPost> {
    return this.http.post<IPost>('http://localhost:5000/posts', newPost);
  }
  updatePost(id: string, post: IPost): Observable<IPost> {
    return this.http.put<IPost>('http://localhost:5000/posts/' + id, post);
  }
  deletePost(id: string): Observable<IPost> {
    return this.http.delete<IPost>('http://localhost:5000/posts/' + id);
  }
}
