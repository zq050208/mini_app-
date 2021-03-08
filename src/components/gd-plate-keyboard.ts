import { Const } from '@/const';
mpx.createComponent({
  properties: {
    plateNo: String,
    disabledNewEnergy: Boolean,
  },
  data: {
    showPlate: false,
    showPlateAnimate: false,
    focus: 1,
    showInput: false,
    activePlateColor: '',
    plateNumberArr: [] as string[],
    numberList: Const.PLATE_INPUT_NUMBER,
    keyList: [],
  },
  methods: {
    changeFocus(index: number) {
      this.showInput = true;
      this.focus = +index;

      if (this.focus === 0) {
        (this.keyList as string[]) = Const.REGION_PROVINCE;
      } else if (this.focus > 0 && this.focus < 8) {
        (this.keyList as any[]) = Const.PLATE_INPUT_NUMBER;
      }
      this.triggerEvent('showPlateView');
    },
    closeInput() {
      this.showInput = false;
    },
    handleInput(val: string | { isLetter: boolean; value: string }) {
      if (!val) return;

      const _plateNumberArr = this.plateNumberArr.slice();
      if (typeof val === 'string') {
        _plateNumberArr[this.focus] = val;
      } else {
        if (this.focus === 1 && !val.isLetter) return;
        _plateNumberArr[this.focus] = val.value;
      }
      this.plateNumberArr = _plateNumberArr;

      if (this.focus < this.maxPlateLength - 1) {
        this.changeFocus(this.focus + 1);
      }
      this.triggerPalteChange();
    },
    deleteInput() {
      if (this.focus >= 0) {
        this.plateNumberArr[this.focus] = '';
        this.plateNumberArr = this.plateNumberArr.slice();
        if (this.focus >= 1) {
          this.changeFocus(this.focus - 1);
        }
        this.triggerPalteChange();
      }
    },
    triggerPalteChange() {
      mpx.vibrateShort({});
      const plateStr = this.plateNumberArr.join('');
      this.triggerEvent('changePlateNo', {
        value: plateStr,
        array: this.plateNumberArr,
      });
    },
  },
  attached() {
    if (this.plateNo) {
      this.plateNumberArr = this.plateNo
        ?.split('')
        .slice(0, this.maxPlateLength);
    } else {
      this.plateNumberArr = Array(this.maxPlateLength).fill('');
    }
  },
  computed: {
    maxPlateLength() {
      return this.disabledNewEnergy ? 7 : 8;
    },
  },
});
