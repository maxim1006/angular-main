import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';
import {StoreModule} from "@ngrx/store";
import {productsReducers} from "./store/index";
import {EffectsModule} from '@ngrx/effects';
import {FamilyEffect} from '../../store/effects/family.effect';
import * as FromEffects from './store/effects';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent,
  },
  {
    path: ':id',
    component: fromContainers.ProductItemComponent,
  },
  {
    path: 'new',
    component: fromContainers.ProductItemComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
      // forFeature использую для лезийных модулей, свой кусок стора этот модуль добавит к общему
      StoreModule.forFeature('products', productsReducers),
      EffectsModule.forFeature([FromEffects.PizzasEffects]),
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
