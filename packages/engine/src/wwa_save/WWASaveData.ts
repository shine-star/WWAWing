import {
    WWASaveConsts,
    WWAButtonTexts,
    WWAData
} from "../wwa_data";
import * as util from "../wwa_util";
import WWASaveDataList from "./WWASaveDataList";
import WWACompress from "./WWACompress";

export default class WWASaveData {
    protected _parent: WWASaveDataList;
    protected _id: number = 0;
    public flag: boolean = false;
    public date: Date = void 0;
    public cvs: HTMLCanvasElement = void 0;
    public ctx: CanvasRenderingContext2D = void 0;
    protected quickSaveData: WWAData = void 0;
    public _statusEnergy: number;
    public constructor(id: number, parent: WWASaveDataList) {
        this._id = id;
        this._parent = parent;
        this.cvs = document.createElement("canvas");
        this.cvs.width = WWASaveConsts.QUICK_SAVE_THUMNAIL_WIDTH;
        this.cvs.height = WWASaveConsts.QUICK_SAVE_THUMNAIL_HEIGHT;
        this.ctx = this.cvs.getContext("2d", { alpha: false });
    }
    public showQickLoad() {
        util.$id("cell-load").textContent = WWAButtonTexts.QUICK_LOAD;
    }
    public save(gameCvs: HTMLCanvasElement, _quickSaveData: WWAData): boolean {
        this._statusEnergy = _quickSaveData.statusEnergy;
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        this.ctx.drawImage(gameCvs, 0, 0, gameCvs.width, gameCvs.height, 0, 0, this.cvs.width, this.cvs.height);
        this.quickSaveData = _quickSaveData;
        this.flag = true;
        this.date = new Date();
        this.showQickLoad();
        return true;
    }
    public getStatusEnergy(): number {
        return this.flag ? this._statusEnergy : -1;
    }
    public load(): WWAData {
        return this.quickSaveData;
    }
    public saveDataSet(src: string, quickSaveData: WWAData, date:Date): void {
        try {
            this.quickSaveData = quickSaveData;
            this._statusEnergy = quickSaveData.statusEnergy;
            this.date = date;
            this.flag = true;
            var img: HTMLImageElement = document.createElement("img");
            img.src = src;
            img.addEventListener("load", () => {
                this.flag = true;
                this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.cvs.width, this.cvs.height);
            });
            this.showQickLoad();
        } catch (error) {

        }
    }
    /**
     * �Ō�ɕۑ������f�[�^�ł��邩��Ԃ�
     */
    public isLastSaveData(): boolean{
        return (this === this._parent.getLastSaveData());
    }
}