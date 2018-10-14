import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import {domenToken} from "../../../../shared/tokens/tokens";

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`${domenToken}pizzas`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`${domenToken}pizzas`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`${domenToken}pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`${domenToken}pizzas/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
