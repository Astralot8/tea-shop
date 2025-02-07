import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router) { }

  public searchSubject: Subject<string> = new Subject<string>();
  
  resetSearch() {
    location.reload();
  }
}
