import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', '../../../assets/css/style_II.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser: User;
  isUpdateUserFormActive: boolean = false;

  constructor(
    private authenticationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  private getLoggedUser() {
    this.authenticationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.getUserProfile(user.id)
      }
    });
  }

  private getUserProfile(id: string) {
    this.authenticationService.getUserProfile(id).subscribe(user => {
      this.loggedUser = user;
      console.log(user)
      if (!user.isActive) {
        // @ts-ignore

        this.isUpdateUserFormActive = true;
      }
    })

  }


}
