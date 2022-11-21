import { MembersService } from './../../services/members.service';
import { Member } from './../../interfaces/api/member';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {
//   NgxGalleryAnimation,
//   NgxGalleryImage,
//   NgxGalleryOptions,
// } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member | undefined;
  memberUsername: string | null | undefined;

  // galleryOptions: NgxGalleryOptions[] = [];
  // galleryImages: NgxGalleryImage[] = [];
  constructor(
    private memberService: MembersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
    // this.imageGalleryConfig();
  }

  loadMember() {
    this.memberUsername = this.activatedRoute.snapshot.paramMap.get('username');
    if (this.memberUsername != null) {
      this.memberService.getMember(this.memberUsername).subscribe((member) => {
        this.member = member;
      });
    }
  }

  // imageGalleryConfig() {
  //   this.galleryOptions = [
  //     {
  //       width: '500px',
  //       height: '500px',
  //       thumbnailsColumns: 4,
  //       imagePercent: 100,
  //       imageAnimation: NgxGalleryAnimation.Slide,
  //       preview: false,
  //     },
  //     // max-width 800
  //     {
  //       breakpoint: 800,
  //       width: '100%',
  //       height: '600px',
  //       imagePercent: 80,
  //       thumbnailsPercent: 20,
  //       thumbnailsMargin: 20,
  //       thumbnailMargin: 20,
  //     },
  //     // max-width 400
  //     {
  //       breakpoint: 400,
  //       preview: false,
  //     },
  //   ];

  //   this.galleryImages = this.getImages();
  // }

  // getImages(): NgxGalleryImage[] {
  //   const imageUrls = [];
  //   if (this.member) {
  //     for (const photo of this.member.photos) {
  //       imageUrls.push({
  //         small: photo?.url,
  //         medium: photo?.url,
  //         big: photo?.url,
  //       });
  //     }
  //   }
  //   return imageUrls;
  // }
}
