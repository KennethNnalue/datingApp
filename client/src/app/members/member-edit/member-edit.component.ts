import { MembersService } from './../../services/members.service';
import { Member } from './../../interfaces/api/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/api/user';
import { AccountService } from 'src/app/services/account.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member: Member | undefined;
  user: User | undefined;

  //Listens  to browser events and emit the event, we use this to prevent user from lclosing the tab or browser
  // while changes made have not been saved
  @HostListener('window:beforeunload', ['$event']) unloadloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    // Get the user out of the currentMember observable
    accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (this.user) {
      this.memberService
        .getMember(this.user.username)
        .subscribe((member) => (this.member = member));
    }
  }

  updateMember() {
    if (this.member) {
      this.memberService.updateMember(this.member).subscribe({
        next: (result) => {
          this.accountService.openSnackBar(
            'You have successfully  Updated your profile'
          );

          this.editForm?.reset(this.member);
        },
      });
    }
  }
}
