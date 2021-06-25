import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpeakOut';
  private cookieMessage: 'aaaa';
  private cookieDismiss: 'bbbbb';
  private cookieLinkText: any;
  ngOnInit(): void {
    // this.titleService.init();
    // this._cookieService.set('cookie', 'website uses cookies to ensure you get the best experience on our website');
    // this._cookieService.get('cookie');
    // console.log('******' + this._cookieService.get('cookie'))
    const cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969'
        },
        button: {
          background: '#ffe000',
          text: '#164969'
        }
      },
      theme: 'classic',
      content: {
        message: 'website uses cookies to ensure you get the best experience on our website',
        dismiss: 'Go it!',
        link: this.cookieLinkText,
        // href: environment.Frontend + '/data privacy'
      }
    });

  }
}
