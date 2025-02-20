import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router) { }

  private searchQuerySubject = new BehaviorSubject<string>('');

  searchValue$ = this.searchQuerySubject.asObservable();
  setSearchQuery(query: string): void{
    this.searchQuerySubject.next(query) // обновление состояния поиска

  }
  
  resetSearch() {
    location.reload();
  }
}
