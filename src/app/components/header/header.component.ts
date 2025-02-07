import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
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
    this.searchService.searchSubject.next(this.searchValue);
    this.router.navigate(['/products']);
  }

  resetSearch() {
    this.searchValue = ''
    this.searchService.searchSubject.next(this.searchValue);
    this.router.navigate(['/products']);
  }
}

