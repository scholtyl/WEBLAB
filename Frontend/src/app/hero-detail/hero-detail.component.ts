import { NgIf, UpperCasePipe } from '@angular/common';
import {Component, Input, numberAttribute} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-hero-detail',
  imports: [UpperCasePipe, NgIf, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})

export class HeroDetailComponent {
  @Input()myhero?:Hero;
}
