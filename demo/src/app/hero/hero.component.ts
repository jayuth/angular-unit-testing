import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls:  ['./hero.component.css']
})
export class HeroComponent {
  // recieve data from the parent HeroesComponent class
  @Input() hero: Hero;

  // send data back to the parent class
  @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
    this.delete.next();
  }
}
