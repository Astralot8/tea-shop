import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { param } from 'jquery';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public searchValue: string = '';

  constructor(
    private router: Router,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    
  }

  searchProducts() {
    this.searchService.searchSubject.next(titleCaseWord(this.searchValue));
    this.router.navigate(['/products']);
  }

  resetSearch() {
    this.searchValue = '';
    this.searchService.searchSubject.next(this.searchValue);
  }
}

function titleCaseWord(searchValue: string): string {
  if(searchValue !== ''){
    return searchValue[0].toUpperCase() + searchValue.substring(1).toLowerCase();
  }
  return searchValue;
  
}

