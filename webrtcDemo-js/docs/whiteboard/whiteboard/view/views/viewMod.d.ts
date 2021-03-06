import { WhiteboardView } from './base';
import { WhiteboardServiceBase } from '../services/base';
import { WhiteboardStore } from '../entities/store';
import { Direction } from '../entities/entity';
import { ProtoGraphic, ViewTool, FileInfo, ScrollMode } from '../entities/viewEntity';
export declare class WhiteboardViewMod extends WhiteboardView {
    private parentDom;
    private whiteboardID;
    private _enable;
    private _activited;
    private viewInfo;
    private whiteboardStore;
    private serviceHandle;
    private viewEvent;
    private whiteboardNode;
    private graphicsBoxConNode;
    private graphicsConNode;
    private graphicsBgContainerNode;
    private protoGraphic;
    private graphicList;
    private mousePointList;
    private flowData;
    private calStandard;
    private drawState;
    constructor(whiteboardID: string, whiteboardStore: WhiteboardStore, serviceHandle: WhiteboardServiceBase);
    private scrollHandle;
    private checkMultipoint;
    private bindEvents;
    destroy(): void;
    private setWhiteboardTransform;
    private handleDragEvent;
    private initDragEvents;
    private updateBindEvents;
    init(parent: string): void;
    private updateStateSizeHandle;
    private calculateHandle;
    private createModule;
    setActivited(val: boolean): void;
    isActivited(): boolean;
    private activited;
    private initDraw;
    private updateMousePointList;
    private updateFlowData;
    private updateProtoGraphic;
    private updateViewInfo;
    private getMouseChangedPoint;
    private getMouseStartPoint;
    private updateGraphicsData;
    private moveGraphics;
    private updateBoxBorderOnSelector;
    private getMouseCoverGraphics;
    private addTextareaDom;
    private addPreDom;
    private addTextareaConDom;
    private bindTextareaInputEvent;
    private bindTextareaFocusEvent;
    private bindTextareaBlurEvents;
    private addTextareaGraphic;
    private updateTextareaGraphic;
    private foucsTextarea;
    private moveByOffset;
    private appendOtherGraphics;
    private drawGraphicsLine;
    private drawGraphicsRect;
    private drawGraphicsLaser;
    private drawGraphicsPath;
    private drawGraphicsEllipse;
    private drawGraphicsHandle;
    private updateGraphicsBox;
    private getBoxByGraphicId;
    private getInstanceByGraphicId;
    private getInstanceSelectorByGraphicId;
    private getBoxSelectorByGraphicId;
    private updateGraphicOnMoving;
    private calculateMoveHandle;
    private updateGraphicListOnMoving;
    private transLocation;
    private getScrollData;
    private getOffsetData;
    private getDataFromGraphicList;
    private setDataToGraphicList;
    private removeGraphic;
    private updatePointerEvents;
    private getBoxInfoByGraphicInfo;
    /** =================== ??????: common method start =================== */
    private downCommonHandle;
    /** =================== ??????: common method start =================== */
    /** =================== ?????????: Laser start =================== */
    private drawLaserMoveHandle;
    private drawLaserLeaveHandle;
    private laserHiddenHandle;
    private addLaserHandle;
    private findLaserHandle;
    /** =================== ?????????: Laser end =================== */
    /** =================== SVG??????: Pen???Line???Ellipse???Rect start =================== */
    private drawSvgUpHandle;
    private drawSvgDownHandle;
    private drawSvgMoveHandle;
    private drawSvgLeaveHandle;
    /** =================== SVG??????: Pen???Line???Ellipse???Rect end =================== */
    /** =================== ????????????: Text start =================== */
    private drawTextUpHandle;
    /** =================== ????????????: Text end =================== */
    /** =================== ????????????: Selector start =================== */
    private drawSelectorDownHandle;
    private drawSelectorMoveHandle;
    private drawSelectorUpHandle;
    private drawSelectorLeaveHandle;
    /** =================== ????????????: Selector end =================== */
    /** =================== ????????????: Earser start =================== */
    private drawEraserMovePcHandle;
    private drawEraserUpPcHandle;
    private drawEraserUpMbHandle;
    /** =================== ????????????: Earser end =================== */
    private removeElement;
    private getElementChild;
    private removeGraphicList;
    private clearSelected;
    scrollToHandle(hPercent: number, vPercent: number, step: number, notify: boolean): void;
    private emitScroll;
    private jumpPage;
    private handleDocsviewEvent;
    private backAddHandle;
    private backRemoveHandle;
    private backMoveHandle;
    private backUpdateHandle;
    private undoAndRedoHandle;
    clearLocalHandle(): void;
    updateRemoteToLocal(graphicList: ProtoGraphic[], delGraphicIdList?: string[]): void;
    private updateToRemote;
    private toggleDrag;
    enable(enable: boolean): boolean;
    isEnable(): boolean;
    clear(): void;
    scroll(horizontalPercent: number, verticalPercent: number): boolean;
    getCurrentScrollPercent(): {
        horizontalPercent: number;
        verticalPercent: number;
        direction: Direction;
    };
    undo(): void;
    redo(): void;
    getAspectRatio(): string;
    getFileInfo(): FileInfo | null;
    getID(): string;
    getName(): string;
    getCreateTime(): number;
    getRoomID(): string;
    getPageCount(): number;
    setBackgroundColor(color: string): boolean;
    getBackgroundColor(): string;
    setToolType(type: ViewTool | null): boolean;
    getToolType(): ViewTool | null;
    setBrushColor(color: string): boolean;
    getBrushColor(): string;
    setBrushSize(thin: number): boolean;
    getBrushSize(): number;
    setTextSize(thin: number): boolean;
    getTextSize(): number;
    getPage(): number;
    setScrollMode(mode: ScrollMode): void;
    setScaleFactor(zoom: number, x: number, y: number): void;
    getScaleFactor(): {
        zoom: number;
        x: number;
        y: number;
    };
}
