import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

/* string variables */
const INIT_WIDTH_PREVIEW: number = 282;
const INIT_HEIGHT_PREVIEW: number = 376;
const ANGLE_DEFAULT: string = '180';
const IMG_OPTION_COVER: string =
  'Растянуть изображение с сохранением пропорций';
const TEXTAREA_PLACEHOLDER: string = 'Введите текст для баннера';
const INPUT_LINK_PLACEHOLDER: string = 'Введите ссылку';
const LINE_HEIGHT_DEFAULT: number = 1.15;
const MAX_NUM_LINE_OF_TEXT: number = 3;

/* data arrays */
const backgroundPositions: string[][] = [
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
  ['Растянуть по вертикали с сохранением пропорций', 'auto 100%'],
  ['Растянуть по горизонтали с сохранением пропорций', '100% auto'],
  ['Растянуть по размеру холста', '100% 100%'],
  ['Растянуть с сохранением пропорций', 'cover'],
  ['Вместить с сохранением пропорций', 'contain'],
];

const textConfigurationList = [
  {
    default: 'Шрифт',
    control: 'fontFamily',
    selectValue: ['Roboto', 'Arial', 'Times New Roman'],
    styleValue: ['Roboto', 'Arial', 'Times New Roman'],
  },
  {
    default: 'Размер шрифта',
    control: 'fontSize',
    selectValue: ['По умолчанию', '14', '18', '22', '26', '32', '38'],
    styleValue: ['16', '14', '18', '22', '26', '32', '38'],
  },
  {
    default: 'Полнота шрифта',
    control: 'fontWeight',
    selectValue: ['Нормальный', 'Жирный'],
    styleValue: ['normal', 'bold'],
  },
];

const textLayoutArr = [
  {
    value: 'left',
    displayValue: 'По левой стороне',
    icon: 'format_align_left',
  },
  {
    value: 'center',
    displayValue: 'По центру',
    icon: 'format_align_center',
  },
  {
    value: 'right',
    displayValue: 'По правой стороне',
    icon: 'format_align_right',
  },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  /* variables */
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageDefaultOption = null;
  imageOptionCover = IMG_OPTION_COVER;
  bgPosOptions: string[][] = backgroundPositions;
  bgSizeOptions: string[][] = backgroundSizes;
  defaultColor: string = '#ffffff';
  defaultGradientColor: string = '#ffffff';
  defaultTextColor: string = '#353535';
  gradientColorOptionString: string = '';
  angleGradient: string = ANGLE_DEFAULT;
  textAreaPlaceholder: string = TEXTAREA_PLACEHOLDER;
  inputLinkPlaceholder: string = INPUT_LINK_PLACEHOLDER;
  lineHeightDefault: number = LINE_HEIGHT_DEFAULT;
  maxLinesOfText: number = MAX_NUM_LINE_OF_TEXT;
  textConfigList = textConfigurationList;
  patternUrl: RegExp = /^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  topPosition: number = 0;
  mouseAction: boolean = false;
  intervalInc: number;
  textLayout = textLayoutArr;
  screenCopy;

  /* form group */
  parameterForm = this.fb.group({
    width: [INIT_WIDTH_PREVIEW],
    height: [INIT_HEIGHT_PREVIEW],
    bgImage: [null],
    fileAttr: ['Выберите изображение для фона'],
    bgColorFrom: [null],
    bgColorTo: [null],
    colorDirection: [this.angleGradient],
    imgPosition: [this.bgPosOptions[0][1]],
    imgCover: [this.bgSizeOptions[0][1]],
    bgGradient: [false],
    text: [null, Validators.required],
    link: ['', Validators.required],
    textAlign: [this.textConfigList[0].styleValue[0]],
    fontFamily: [this.textConfigList[0].styleValue[0]],
    fontSize: [this.textConfigList[1].styleValue[0]],
    fontWeight: [this.textConfigList[2].styleValue[0]],
    widthText: [INIT_WIDTH_PREVIEW],
    textColor: [null],
  });

  dynamicStyle$;

  maxHeight: number =
    this.parameterForm.get('fontSize').value *
    this.lineHeightDefault *
    this.maxLinesOfText;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('pre') pre: ElementRef;

  dynamicPreviewStyle = {
    width: '',
    height: '',
    backgroundColor: '',
    background: '',
    position: 'relative',
  };

  dynamicPreStyle = {
    display: 'block',
    position: 'absolute',
    width: '',
    lineHeight: this.lineHeightDefault,
    maxHeight: `${this.maxHeight}px`,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'hidden',
    textAlign: '',
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    color: this.defaultTextColor,
    top: `${this.topPosition}px`,
  };

  dynamicBgImage = {
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundImage: '',
    backgroundPosition: '',
    backgroundSize: '',
    backgroundRepeat: 'no-repeat',
  };

  constructor(
    private fb: FormBuilder,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.dynamicStyle$ = this.parameterForm.valueChanges.pipe(
      startWith(this.parameterForm.value),
      map((val) => {
        this.dynamicPreviewStyle.width = `${val.width}px`;
        this.dynamicPreviewStyle.height = `${val.height}px`;
        this.dynamicPreviewStyle.backgroundColor = val.bgColorFrom;
        this.dynamicPreviewStyle.background = !val.bgGradient
          ? val.bgColorFrom
          : `linear-gradient(${val.colorDirection}deg, ${val.bgColorFrom}, ${val.bgColorTo})`;
        this.dynamicBgImage.backgroundImage = !val.bgImage
          ? 'none'
          : `url(${val.bgImage})`;
        this.dynamicBgImage.backgroundPosition = val.imgPosition;
        this.dynamicBgImage.backgroundSize = val.imgCover;
        this.dynamicPreStyle.width = `${val.widthText}px`;
        this.dynamicPreStyle.textAlign = val.textAlign;
        this.dynamicPreStyle.fontFamily = val.fontFamily;
        this.dynamicPreStyle.fontSize = `${val.fontSize}px`;
        this.dynamicPreStyle.fontWeight = val.fontWeight;
        this.dynamicPreStyle.color = val.textColor;

        return this.dynamicPreviewStyle;
      })
    );
  }

  onChangeFirstColor(color) {
    this.parameterForm.patchValue({ bgColorFrom: color });
  }

  onChangeSecondColor(color) {
    this.parameterForm.patchValue({ bgColorTo: color });
  }

  onChangeTextColor(color) {
    this.parameterForm.patchValue({ textColor: color });
  }

  textLayoutChange(event: MatButtonToggleChange) {
    this.dynamicPreStyle.textAlign = event.value;
  }

  previewFile(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const max_height = 500;
      const max_width = 500;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Максимальный размер ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Максимальные возможные размеры ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.parameterForm.patchValue({ bgImage: this.cardImageBase64 });
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + 'd';
    }
    return value;
  }

  formatLabelWidth(value: number = INIT_WIDTH_PREVIEW) {
    return value + 'px';
  }

  /* positioning the text on the banner */

  getErrorMessageLink() {
    return this.parameterForm.hasError('required', 'link')
      ? 'Обязательное поле для ввода'
      : '';
  }

  increaseStart($event) {
    const maxTopPosition: number = this.parameterForm.get('height').value;
    this.mouseAction = true;
    $event.type === 'mousedown' &&
      this.mouseAction &&
      ((this.intervalInc = setInterval(() => {
        if (this.topPosition < maxTopPosition - this.maxHeight) {
          this.topPosition++;
          this.dynamicPreStyle.top = this.topPosition + 'px';
        }
      })),
      500);
  }

  increaseStop($event) {
    ($event.type === 'mouseleave' || $event.type === 'mouseup') &&
      this.mouseAction &&
      clearInterval(this.intervalInc);
    this.mouseAction = false;
  }

  decreaseStart($event) {
    this.mouseAction = true;
    $event.type === 'mousedown' &&
      this.mouseAction &&
      ((this.intervalInc = setInterval(() => {
        if (this.topPosition > 0) {
          this.topPosition--;
          this.dynamicPreStyle.top = this.topPosition + 'px';
        }
      })),
      500);
  }

  decreaseStop($event) {
    ($event.type === 'mouseleave' || $event.type === 'mouseup') &&
      this.mouseAction &&
      clearInterval(this.intervalInc);
    this.mouseAction = false;
  }

  /* download to PNG */
  downloadImage() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      const link = document.createElement('a');
      const fileName = `banner-${new Date().toISOString()}.png`;
      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  /* clipboard to HTML */
  copyContent() {
    const exportHtml = this.content.nativeElement.childNodes[0].outerHTML;
    this.clipboardService.copyFromContent(exportHtml);
  }

  /* clipboard config to JSON */
  copyConfig() {
    const configCopy = JSON.stringify(this.parameterForm.value);
    this.clipboardService.copyFromContent(configCopy);
  }
}
