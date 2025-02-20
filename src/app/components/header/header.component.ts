import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public searchValue: string = '';
  
  public searchSubject: Subject<string> = new Subject<string>();
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public searchService: SearchService
  ) {

    this.searchSubject.subscribe(query => {
      this.searchService.setSearchQuery(query); // передача запроса в сервис
    })
  }

  ngOnInit(): void {
    
  }

  searchProducts() {
    this.searchSubject.next(titleCaseWord(this.searchValue));
    this.router.navigate(['/products'])
  }

  resetSearch() {
    this.searchValue = '';
    this.searchSubject.next(this.searchValue);
  }
}

function titleCaseWord(searchValue: string): string {
  if(searchValue !== ''){
    return searchValue[0].toUpperCase() + searchValue.substring(1).toLowerCase();
  }
  return searchValue;
  
}

