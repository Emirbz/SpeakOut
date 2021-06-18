import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {User} from '../../models/user';
import {File} from '../../models/File';

import {CompanyService} from '../../Services/company.service';
import {Company} from '../../models/Company';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FileService} from '../../Services/file.service';
import {ToastrService} from 'ngx-toastr';
import {JobOffer} from '../../models/JobOffer';
import {JobApply} from '../../models/JobApply';
import {JobOfferService} from '../../Services/job-offer.service';
import {JobApplyService} from '../../Services/job-apply.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', '../../../assets/css/style_II.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser: User;
  isUpdateUserFormActive: boolean = false;
  isCreateCompanyActive: boolean = false;
  isUpdateCompanyActive: boolean = false;
  hasCompany: boolean = false;
  loggedUserCompany: Company;
  isProfilePicUploading: boolean = false;
  isCompanyPicUploading: boolean = false;
  profilePicPreview: SafeUrl;
  companyPicPreview: SafeUrl;
  selectedTab: number = 0;
  profileClass: string = '';
  loadedCompanyOffers: JobOffer[] = [];
  loadedUserApplies: JobApply[] = [];
  companyOffersClass: string = '';
  hasResume: boolean = false;
  userResume: File;
  listApplicants: User[] = [];
  displayApplicantsList: boolean = false;
  jobOfferToDelete: JobOffer;
  deletedJobOfferId: string;
  deleteCompanyId: string;
  companyToDelete: Company;

  constructor(
    private authenticationService: AuthentificationService,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private toastr: ToastrService,
    private jobOfferService: JobOfferService,
    private jobApplyService: JobApplyService
  ) {
  }

  ngOnInit(): void {
    this.getLoggedUser();


  }

  checkUserGotCompany(id: string | undefined) {
    this.companyService.getCompanyByUserId(id).subscribe(company => {
      if (company.companyId && company.companyId > 0 && company.isValid) {
        // if user has already a company its iformation is displayed
        this.hasCompany = true;
        this.loggedUser.hasCompany = true;
        localStorage.setItem('user', JSON.stringify(this.loggedUser));
        this.loggedUserCompany = company;
        this.loadCompanyOffers();
        console.log(this.loggedUserCompany);

      } else {
        this.loadUserApplies();
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
    this.fileService.uploadFile(fileToUpload, <string>this.loggedUser.id, 'image').subscribe(uploadedFile => {

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

  changeTab() {

    if (this.selectedTab === 0) {
      this.selectedTab = 1;
      this.companyOffersClass = 'animated fadeIn';
    } else {
      this.profileClass = 'animated fadeIn';
      this.selectedTab = 0;
    }

  }

  getUserResume(user: User) {

    const resume = user.files?.filter(f => f.type === 'cv')[user.files?.filter(f => f.type === 'cv').length - 1];

    if (resume !== undefined) {
      this.hasResume = true;
      this.loggedUser.hasResume = true;
      localStorage.setItem('user', JSON.stringify(user));
      this.userResume = resume
    }


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

  uploadResume(event: any) {
    // get chosen file
    const fileToUpload = event.target.files[0];
    // upload file
    this.fileService.uploadFile(fileToUpload, <string>this.loggedUser.id, 'cv').subscribe(uploadedFile => {
      this.hasResume = true;
      this.loggedUser.hasResume = true;
      this.userResume = uploadedFile
      this.loggedUser.files?.push(uploadedFile);
      this.authenticationService.setLoggedUser(this.loggedUser)
      this.toastr.success('Resume added', 'Your resume  has been added successfully');
    })


  }

  displayApplicants(event: User[]) {
    this.listApplicants = event
    this.displayApplicantsList = true;

  }

  closeApplicants() {
    this.listApplicants = [];
    this.displayApplicantsList = false;

  }

  private getLoggedUser() {
    this.authenticationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.loggedUser = user;
        console.log(this.loggedUser)
        this.checkUserGotCompany(user.id);
        this.getUserResume(user);
        this.getUserProfile(user.id)
      }

    }, error => {

    }, () => {


    });
  }

  private getUserProfile(id: string | undefined) {
    this.authenticationService.getUserProfile(id).subscribe(user => {
      //  this.loggedUser = user;
      if (!user.isActive) {
        // if users has not completed his profile, the form is shown
        this.isUpdateUserFormActive = true;

      }
    })

  }

  private loadCompanyOffers() {

    this.jobOfferService.getAllJobOffers(null).subscribe(jobOffers => {
      this.loadedCompanyOffers = jobOffers.filter(j => (j.companyId === this.loggedUserCompany.companyId && j.isValid)).map(job => {
        // add list of jobApply to for each jobOffer
        this.loadJobAppliesByJob(job);
        return job;
      });
    })


  }

  private loadUserApplies() {
    this.jobApplyService.getAllJobApplies().subscribe(jobApply => {
      this.loadedUserApplies = jobApply.filter(j => j.userId === this.loggedUser.id && j.isValid);
    })

  }

  private loadJobAppliesByJob(job: JobOffer) {
    this.jobApplyService.getJobApplyByJobOffer(job.jobId).subscribe(jobApply => {
      job.jobApply = jobApply;
    })
  }

  displayModalDeleteJob(jobOffer: JobOffer) {
    this.jobOfferToDelete = jobOffer;


  }

  displayModalDeleteCompany(company: Company) {
    this.companyToDelete = company;
    console.log(this.companyToDelete)


  }

  deleteItem($event: string, module: string) {
    if (module === 'jobOffer') {
      this.deletedJobOfferId = $event;
      setTimeout(() => {
        this.loadedCompanyOffers = this.loadedCompanyOffers.filter(j => j.jobId + '' !== $event);
      }, 1000);

    } else {

      this.deleteCompanyId = $event;
      setTimeout(() => {
        this.hasCompany = false;
        this.loggedUser.hasCompany = false;
        localStorage.removeItem('USER_ROLE');
        this.loggedUser.hasCompany = false;
        localStorage.setItem('user', JSON.stringify(this.loggedUser));
        this.loggedUserCompany = undefined as any;
        this.loadedCompanyOffers = [];
        this.loadUserApplies();

      }, 1000)
    }

  }

  deleteResume() {
    console.log(this.loggedUser);
    const listOfFiles = this.loggedUser.files?.filter(f => f.type === 'cv') as File[];
    listOfFiles.forEach((file, i) => {
      this.fileService.deleteFile(file).subscribe(() => {

        this.hasResume = false;
        this.loggedUser.hasResume = false;
        this.userResume = undefined as any
        this.loggedUser.files = this.loggedUser.files?.filter(f => f.type !== 'cv') as File[];
        localStorage.setItem('user', JSON.stringify(this.loggedUser));
        if (i === listOfFiles.length - 1) {
          this.toastr.success('Resume deleted', 'Your resume  has been deleted successfully');

        }

      })

    })

  }
}
