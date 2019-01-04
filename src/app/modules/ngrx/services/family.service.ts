import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FamilyMember} from '@models/family.model';
import {domenToken} from '../../shared/tokens/tokens';

@Injectable()
export class MFamilyService {

    constructor(private http: HttpClient) {}

    public getFamily(): Observable<FamilyMember[]> {
        return this.http.get<FamilyMember[]>(`${domenToken}api/family`);
    }

    public searchMembers(query: string): Observable<FamilyMember[]> {
        return this.http.get<FamilyMember[]>(`${domenToken}api/family/search`, {
            params: {
                query
            }
        });
    }
}
