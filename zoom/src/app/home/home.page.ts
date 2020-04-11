import { Component } from '@angular/core';
import { Zoom } from '@ionic-native/zoom/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  API_KEY = 'TaS7QRe268FQMCzX2c1z322HIWyR3JNanT666454545t';
  API_SECRET = 'KID3eXi45Op53MYkr13p913Zn60XyN83oaUmo3nw';
  zoom: any = {
    usuario: '',
    senha: '',
    usuarioSala: '579-902-188',
    senhaSala: '701945',
    nickUsuarioSala: 'Meu Cel'
  };
  constructor(private zoomService: Zoom, private toastCtrl: ToastController) {

  }

  inicializarZoom() {
    // Initialize Zoom SDK, need to be called when app fired up.
    this.zoomService.initialize(this.API_KEY, this.API_SECRET)
      .then((success: any) => {
        console.log('inicializou com sucesso!');


      })
      .catch((error: any) => {
        this.showToast('erro  ao inicializar');
        console.log(error);
      });
  }

  logarNoZoom() {
    // Log user in with Zoom username and password.
    this.zoomService.login(this.zoom.usuario, this.zoom.senha)
      .then((success: any) => {
        this.showToast('Logado com sucesso');

      })
      .catch((erro) => {
        this.showToast('Login com erro');
        console.log(erro);
      });
  }

  entrarNaSalaDoZoom() {
    const options = {
      no_driving_mode: true,
      no_invite: true,
      no_meeting_end_message: true,
      no_titlebar: false,
      no_bottom_toolbar: false,
      no_dial_in_via_phone: true,
      no_dial_out_to_phone: true,
      no_disconnect_audio: true,
      no_share: true,
      no_audio: true,
      no_video: true,
      no_meeting_error_message: true
    };
    // Join meeting.
    this.zoomService.joinMeeting(this.zoom.usuarioSala, this.zoom.senhaSala, this.zoom.nickUsuarioSala, options)
      .then((response) => {
        this.showToast('entrei na sala');
        console.log('entrei');
      })
      .catch((e) => {
        this.showToast('deu erro ao entrar na entrei sala');
        console.log(e);
      });
  }

  sairDaSalaDoZoom() {
    this.zoomService.logout()
      .then((success: boolean) => {
        this.showToast('Saiu com sucesso!');
      })
      .catch((error: any) => console.log(error));

  }

  callZoom() {





    // Check whether user is logged in.
    // this.zoomService.isLoggedIn()
    //   .then((success: boolean) => console.log(success))
    //   .catch((error: any) => console.log(error));



    //   // Start an existing meeting for non-login user.
    //   this.zoomService.startMeetingWithZAK(meetingNumber, displayName, zoomToken, zoomAccessToken, userId, options)
    //     .then((success: any) => console.log(success))
    //     .catch((error: any) => console.log(error));

    //   // Start an existing meeting for logged in user.
    //   this.zoomService.startMeeting(meetingNumber, vanityId, options)
    //     .then((success: any) => console.log(success))
    //     .catch((error: any) => console.log(error));

    //   // Start an instant meeting for logged in user.
    //   this.zoomService.startInstantMeeting()
    //     .then((success: anu) => console.log(success))
    //     .catch((error: any) => console.log(error));

    //   // Set language.
    //   this.zoomService.setLanguage('pt-BR')
    //     .then((success: any) => console.log(success))
    //     .catch((error: any) => console.log(error));
  }

  async showToast(msg: string = 'ola') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
