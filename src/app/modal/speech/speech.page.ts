import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  SpeechRecognition,
  SpeechRecognitionListeningOptions,
} from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.page.html',
  styleUrls: ['./speech.page.scss'],
})
export class SpeechPage implements OnInit {
  listening: boolean = true;

  constructor(
    private speechRecognition: SpeechRecognition,
    public modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.speechRecognition
      .isRecognitionAvailable()
      .then((available: boolean) => {
        console.log(available);
        if (available) {
          // Get the list of supported languages
          this.cekPermission();
        }
      })
      .catch(async (err) => {
        console.log('Tidak ada speech : ', err);
      });

    // // Check permission
    // this.speechRecognition
    //   .hasPermission()
    //   .then((hasPermission: boolean) => console.log(hasPermission));

    // // Request permissions
    // this.speechRecognition.requestPermission().then(
    //   () => console.log('Granted'),
    //   () => console.log('Denied')
    // );
  }

  cekPermission() {
    this.speechRecognition
      .hasPermission()
      .then((hasPermission: boolean) => {
        if (hasPermission) {
          this.startSpeech();
        } else {
          this.speechRecognition.requestPermission().then((res) => {
            console.log('respon permission : ', res);
          });
        }
      })
      .then((err) => {
        console.log('Error permission : ', err);
      });
  }

  startSpeech() {
    let options: SpeechRecognitionListeningOptions = {
      language: 'id-ID',
      showPopup: false,
      matches: 1,
    };

    this.speechRecognition
      .startListening(options)
      .subscribe(async (matches: string[]) => {
        let data = matches[0];
        console.log(data);
        this.closeModal(data);
      });
  }

  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
