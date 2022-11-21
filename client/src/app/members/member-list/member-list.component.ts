import { Observable } from 'rxjs';
import { MembersService } from './../../services/members.service';
import { Member } from './../../interfaces/api/member';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> | undefined;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

  // loadMembers() {
  //   this.memberService.getMembers().subscribe({
  //     next: (members) => {
  //       console.log(members);
  //       this.members = members;
  //     },
  //   });
  // }
}
