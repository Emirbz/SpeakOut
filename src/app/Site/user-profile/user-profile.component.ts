import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {User} from '../../models/user';
import {File} from '../../models/File';

import {CompanyService} from '../../Services/company.service';
import {Company} from '../../models/Company';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FileService} from '../../Services/file.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', '../../../assets/css/style_II.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser: User;
  isUpdateUserFormActive: boolean = false;
  isCreateCompanyActive: boolean = false;
  hasCompany: boolean = false;
  loggedUserCompany: Company;
  isProfilePicUploading: boolean = false;
  isCompanyPicUploading: boolean = false;
  profilePicPreview: SafeUrl;
  companyPicPreview: SafeUrl;

  constructor(
    private authenticationService: AuthentificationService,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getLoggedUser();

  }

  checkUserGotCompany(id: string | undefined) {
    this.companyService.getCompanyByUserId(id).subscribe(company => {
      if (company.companyId && company.companyId > 0) {
        // if user has already a company its iformation is displayed
        this.hasCompany = true;
        this.loggedUserCompany = company;

      }
    })

  }

  updateProfilePicture(event: any, picture: 'PROFILE' | 'COMPANY') {
    // get chosen file
    const fileToUpload = event.target.files[0];

    // display image preview
    this.displayImageToUpload(event, picture);

    // start loader to begin upload && update
    picture === 'PROFILE' ? this.isProfilePicUploading = true : this.isCompanyPicUploading = true

    // upload file
    this.fileService.uploadFile(fileToUpload, <string>this.loggedUser.id).subscribe(uploadedFile => {

      // update the picture url
      picture === 'PROFILE' ? this.updateUserPicture(uploadedFile) : this.updateCompanyPicture(uploadedFile);
    })

  }

  displayImageToUpload(event: any, picture: 'PROFILE' | 'COMPANY') {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const safeUrlImage = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      picture === 'PROFILE' ? this.profilePicPreview = safeUrlImage : this.companyPicPreview = safeUrlImage
    };
  }

  private getLoggedUser() {
    this.authenticationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.getUserProfile(user.id)
        this.checkUserGotCompany(user.id);

      }
    });
  }

  private getUserProfile(id: string) {
    this.authenticationService.getUserProfile(id).subscribe(user => {
      this.loggedUser = user;
      console.log(user)
      if (!user.isActive) {
        // if users has not completed his profile, the form is shown
        this.isUpdateUserFormActive = true;
      }
    })

  }

  private updateUserPicture(uploadedFile: File) {
    this.loggedUser.photoUrl = uploadedFile.filePath;
    this.authenticationService.updateUser(this.loggedUser).subscribe(() => {
      this.isProfilePicUploading = false;
      this.toastr.success('User updated', 'Your profile picture has updated successfully');

      // update local storage and local user
      localStorage.setItem('user', JSON.stringify(this.loggedUser));
      this.authenticationService.setLoggedUser(this.loggedUser)
    });


  }

  private updateCompanyPicture(uploadedFile: File) {
    this.loggedUserCompany.companyUrl = uploadedFile.filePath;
    this.companyService.updateCompany(this.loggedUserCompany).subscribe(() => {

      this.isCompanyPicUploading = false;
      this.toastr.success('Company updated', 'Your company picture has updated successfully');


    })

  }
}
