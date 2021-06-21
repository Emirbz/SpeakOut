import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user';
import {JobApply} from '../../../models/JobApply';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-frame',
  templateUrl: './jitsi-frame.component.html',
  styleUrls: ['./jitsi-frame.component.scss']
})
export class JitsiFrameComponent implements OnInit, OnDestroy {
  @Input() jobApply: JobApply;
  @Input() loggedUser: User
  @Output() meetingEnded = new EventEmitter<boolean>();
  private api: any;

  constructor() {
  }

  ngOnInit(): void {
    this.generateMeeting()
  }

  generateMeeting() {
    const domain = environment.jitsi.domain;
    const options = {
       roomName: environment.jitsi.default_room_name + this.jobApply.applyId,
      // roomName: 'environment',
      width: 1142,
      configOverwrite: {
        startWithAudioMuted: true,
        enableWelcomePage: false
      },
      height: 720,
      parentNode: document.querySelector('#meet'),
      userInfo: {
        displayName: this.loggedUser.firstName + ' ' + this.loggedUser.lastName
      }
    };
    console.log(options.roomName)


    this.api = new JitsiMeetExternalAPI(domain, options);
    this.api.addEventListeners({
      videoConferenceLeft: this.videoConferenceLeft,

    });
  }

  videoConferenceLeft = () => {
    this.api.executeCommand('hangup');
    // @ts-ignore
    $('#meet').find('iframe').remove();
    this.meetingEnded.emit(true)
  }

  ngOnDestroy(): void {
    this.api.executeCommand('hangup');

  }

}
