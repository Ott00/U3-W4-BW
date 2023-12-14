import { Injectable } from '@angular/core';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root',
})
export class PopupNotificationService {
  constructor() {}

  toastNotificationSuccess(successMsg: string) {
    const newToastNotification = new ToastNotificationInitializer();

    //Stilizza l'alert
    newToastNotification.setTitle(successMsg);
    // newToastNotification.setMessage('Your message!');
    newToastNotification.setConfig({
      autoCloseDelay: 2000,
      textPosition: 'left',
      layoutType: DialogLayoutDisplay.CUSTOM_ONE,
      animationIn: AppearanceAnimation.SLIDE_IN_RIGHT,
      animationOut: DisappearanceAnimation.SLIDE_OUT_RIGHT,
      toastPosition: ToastPositionEnum.BOTTOM_RIGHT,
    });
    //Permette la partenza dell'alert
    newToastNotification.openToastNotification$();
  }

  toastNotificationError(errMessage: string) {
    const newToastNotification = new ToastNotificationInitializer();

    //Stilizza l'alert
    newToastNotification.setTitle(errMessage);
    // newToastNotification.setMessage('');
    newToastNotification.setConfig({
      autoCloseDelay: 2500,
      textPosition: 'left',
      layoutType: DialogLayoutDisplay.DANGER,
      animationIn: AppearanceAnimation.SLIDE_IN_RIGHT,
      animationOut: DisappearanceAnimation.SLIDE_OUT_RIGHT,
      toastPosition: ToastPositionEnum.BOTTOM_RIGHT,
    });
    //Permette la partenza dell'alert
    newToastNotification.openToastNotification$();
  }
}
