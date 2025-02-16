import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, merge, Observable, of, Subscriber, Subscription } from 'rxjs';
import { AccordionItem } from '../../types/accordion.type';

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

  public accordionArray: AccordionItem[] = [
    {
      title: 'Собираете ли вы подарочные боксы?',
      text: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!',
    },
    {
      title: 'Сколько у вас разновидностей чая?',
      text: 'У нас большой выбор разных сортов чая, также мы может собрать и привезти на заказ, или собрать индивидуальную чайную композицию на основе Ваших предпочтений.',
    },
    {
      title: 'В какой срок осуществляется доставка?',
      text: 'Срок доставки зависит от выбранного адреса, в городах присуствия которые указаны на вкладке Контакты доставка осуществляется в течении двух часов при наличии выбранного Вами чая.',
    },
    {
      title: 'У вас обновляется ассортимент?',
      text: 'Да, наши специяалисты всегда в поисках новых интересных сортов и композиций.',
    },
    {
      title: 'Какого объема у вас пачки чая?',
      text: 'Обьем одной пачки от 100 гр.',
    },
  ]

  accordionItem: AccordionItem = {
    title: '',
    text: '',
  };

  isRotate: boolean[] = [];

  private subscription: Subscription | null = null;

  constructor() {
    this.accordionArray.forEach(()=> this.isRotate.push(false));
    this.popUp = new Observable((observer: Subscriber<boolean>) => {
      const timeOut = setTimeout(() => {
        observer.next(true);
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeOut);
        },
      };
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

  closePopUp(): void {
    this.isShowPopUp = false;
  }

  rotateArrow(index: number): void {
    this.isRotate[index] = !this.isRotate[index];
  }
}
