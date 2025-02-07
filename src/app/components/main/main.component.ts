import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [RouterLink, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})


export class MainComponent implements OnInit, OnDestroy {
  private popUp: Observable<boolean>;
  popUpload: boolean = true;
  isShowPopUp: boolean = false;
  @ViewChild('svg')
  private svg!: ElementRef;

  private subscription: Subscription | null = null;
  
  constructor() {
    this.popUp = new Observable((observer: Subscriber<boolean>) => {
      const timeOut = setTimeout(() => {
        observer.next(true);
      }, 10000);

      return {
        unsubscribe(){
          clearTimeout(timeOut);
        }
      }
    });

   
  }
  ngOnInit(): void {
    this.subscription = this.popUp.subscribe((param) => {
      this.isShowPopUp = param;
    });
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closePopUp(){
    this.isShowPopUp = false;
  }

  rotateArrow(target: HTMLElement, textElem: HTMLElement) {
    target.classList.toggle('rotated');
  }
}
