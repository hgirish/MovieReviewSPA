import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  upload(id, image) : Observable<any> {
    var formData = new FormData();
    formData.append('file', image);
    return this.http.post(`/api/movies/${id}/images`, formData);
  }

  getImages(id):Observable<Image[]> {
    return this.http.get<Image[]>(`/api/movies/${id}/images`);
  }
}
