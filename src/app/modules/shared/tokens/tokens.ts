import { InjectionToken } from "@angular/core";
import { environment } from "../../../../environments/environment";

const injectionToken = new InjectionToken("domen");

export const domenToken = `${environment.domenUrl}/api/`;
export const domenTokenProxy = "http://localhost:4200/";
export const domenTokenDb = "http://localhost:3004/";
