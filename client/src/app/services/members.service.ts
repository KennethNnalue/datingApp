import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../interfaces/api/member';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  // save our members locally in this service
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    // If we already have memebers locally, return them as an observable
    if (this.members.length > 0) return of(this.members);

    //If members array is empty, then make an api call and save them in a local variable members and also return it
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string) {
    //find the member in our local varriable members
    const memeber = this.members.find((x) => x.username === username);

    // if member exists , return it
    if (memeber !== undefined) return of(memeber);

    // If member does not exist, then make an API call to get member
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(memeber: Member) {
    return this.http.put<Member>(this.baseUrl + 'users', memeber).pipe(
      map(() => {
        // when we update a member, we go though the members array we have locally to find the position
        // of the member and also update it to the current updated member value
        const index = this.members.indexOf(memeber);
        this.members[index] = memeber;
      })
    );
  }
}
