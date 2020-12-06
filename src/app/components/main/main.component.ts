import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from, Subject } from 'rxjs';

const INIT_WIDTH_PREVIEW: number = 282;
const INIT_HEIGHT_PREVIEW: number = 376;
const IMG_DEFAULT_POSITION: string = 'Расположение изображение';
const ANGLE_DEFAULT: string = '180';
const IMG_OPTION_COVER: string =
  'Растянуть изображение с сохранением пропорций';
const TEXTAREA_PLACEHOLDER: string = 'Введите текст для баннера';
const INPUT_LINK_PLACEHOLDER: string = 'Введите ссылку';
const backgroundPositions: string[][] = [
  [IMG_DEFAULT_POSITION, 'left top'],
  ['По центру', 'center center'],
  ['По центру вверху', 'center top'],
  ['По центру внизу', 'center bottom'],
  ['Слева вверху', 'left top'],
  ['Слева по центру', 'left center'],
  ['Слева внизу', 'left bottom'],
  ['Справа вверху', 'right top'],
  ['Справа по центру', 'right center'],
  ['Справа внизу', 'right bottom'],
];

const backgroundSizes: string[][] = [
  ['Размер изображения', ''],
  ['Растянуть по вертикали с сохранением пропорций', 'auto 100%'],
  ['Растянуть по горизонтали с сохранением пропорций', '100% auto'],
  ['Растянуть по размеру холста', '100% 100%'],
  ['Растянуть с сохранением пропорций', 'cover'],
  ['Вместить с сохранением пропорций', 'contain'],
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  /* Variables */
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageDefaultOption = IMG_DEFAULT_POSITION;
  imageOptionCover = IMG_OPTION_COVER;
  bgPosOptions: string[][] = backgroundPositions;
  bgSizeOptions: string[][] = backgroundSizes;
  defaultColor: string = '';
  defaultGradientColor: string = '';
  gradientColorOptionString: string = '';
  angleGradient: string = ANGLE_DEFAULT;
  textAreaPlaceholder: string = TEXTAREA_PLACEHOLDER;
  inputLinkPlaceholder: string = INPUT_LINK_PLACEHOLDER;

  parameterForm = this.fb.group({
    width: [INIT_WIDTH_PREVIEW],
    height: [INIT_HEIGHT_PREVIEW],
    bgImage: [null],
    bgColorFrom: [null],
    bgColorTo: [null],
    colorDirection: [this.angleGradient],
    imgPosition: [this.bgPosOptions[0][1]],
    imgCover: [this.bgSizeOptions[0][1]],
    bgGradient: [false],
    text: [null],
    link: [null],
  });

  dynamicStyle = {
    width: `${this.parameterForm.get('width').value}px`,
    height: `${this.parameterForm.get('height').value}px`,
  };

  destroyed$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.parameterForm.valueChanges.subscribe((e) => {
      console.log(e);
      this.dynamicStyle.width = e.width + 'px';
      this.gradientColorOptionString = `linear-gradient(${this.defaultColor}, ${this.defaultGradientColor})`;
      console.log(this.dynamicStyle);
      console.log(this.gradientColorOptionString);
    });
  }

  previewFile(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 500;
      const max_width = 500;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Максимальный размер ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Максимальные возможные размеры ' +
              max_height +
              '*' +
              max_width +
              'px';
            console.log(this.imageError);
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
