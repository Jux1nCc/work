import { WhiteboardServiceBase } from './view/services/base';
import { WhiteboardError } from './view/entities/error';
import { ProtoGraphic, FileInfo } from './view/entities/viewEntity';
import { View, ErrorData, PushType } from './view/entities/entity';
declare enum GetModListType {
    Initiative = 1,
    Inner = 2
}
export declare class WhiteboardService extends WhiteboardServiceBase {
    private stateCenter;
    private logger;
    private socketCenter;
    constructor(options: {
        stateCenter: any;
        logger: any;
        socketCenter: any;
        whiteboardError: WhiteboardError;
    });
    private modIdMapData;
    private listenerList;
    private graphicLimit;
    private modLimit;
    private modListSeq;
    private calStandard;
    private reverseGraphicList;
    private transModInfo;
    private createModInfo;
    private getModHeader;
    private getModInfo;
    private posToPageNum;
    private mapPageNumList;
    private judgeGraphicPage;
    private checkProtoGraphic;
    private mapDrawPages;
    private splitPage;
    getRoom(): void;
    actionListener(listener: string, ...args: any[]): void;
    bindListener(listener: string, callBack: Function): void;
    private updateMap;
    private getMap;
    private deleteMap;
    private getModPropSeq;
    private updateMapByMod;
    private updateMapByModifyModOption;
    private updateMapByGraphicListSeqs;
    private getPopDoTaskIndex;
    private getUndoHandle;
    private addUndoHandle;
    private deleteUndoHandle;
    private getRedoHandle;
    private addRedoHandle;
    private deleteRedoHandle;
    private setInProgress;
    private getInProgress;
    private setModSendSwitch;
    private getModSendSwitch;
    private setGraphicSendSwitch;
    private getGraphicSendSwitch;
    private clearPullMarks;
    private moveSendBefore;
    private moveSendAfter;
    private mergeGraphicList;
    private updateMoveTaskList;
    private updateModifyModTaskList;
    private modifyModSendBefore;
    private cachePushModifyModTaskHandle;
    private modifyModRspAfter;
    private getOldModInfoByModifyModOption;
    private checkScroll;
    getModName(whiteboardID: string): string;
    getUserName(): string;
    getCreateTime(whiteboardID: string): number;
    getRoomID(whiteboardID: string): string;
    getPageCount(whiteboardID: string): number;
    setSize(whiteboardID: string, viewWidth: number, viewHeight: number): boolean;
    setViewportSize(whiteboardID: string, viewportWidth: number, viewportHeight: number): void;
    undo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    redo(whiteboardID: string, success: (graphicList: ProtoGraphic[]) => void, error: (graphicList: ProtoGraphic[]) => void): void;
    createMod(view: View, success: (whiteboardID: string) => void, error: (errorData: ErrorData) => void): void;
    setMod(option: {
        [index: string]: number | string | boolean;
    }, success: (modID: string) => void, error: (errorData: ErrorData, modifyModOption?: {
        [index: string]: number | string | boolean;
    }) => void): void;
    destroyMod(whiteboardID: string, success: (whiteboardID: string) => void, error: (errorData: ErrorData) => void): void;
    clearView(whiteboardID: string, success: () => void, error: (errorData: ErrorData) => void): void;
    updateToRemote(whiteboardID: string, graphicList: ProtoGraphic[], error: (graphicList: ProtoGraphic[]) => void): void;
    private updateToRemoteHandle;
    getModList(type: GetModListType, success?: (whiteboardIDList: string[]) => void, error?: (errorData: ErrorData) => void): void;
    scroll(whiteboardID: string, horizontalPercent: number, verticalPercent: number, pptStep: number, success?: (whiteboardID: string) => void, error?: (whiteboardID: string, horizontalPercent: number, verticalPercent: number, step?: number) => void): void;
    reload(): void;
    loadCurrentGraphics(whiteboardID: string, horizontalPercent: number, verticalPercent: number): void;
    getScrollPercent(whiteboardID: string): {
        horizontalPercent: number;
        verticalPercent: number;
        pptStep: number;
    };
    getAspectRatio(whiteboardID: string): string;
    getFileInfo(whiteboardID: string): FileInfo | null;
    getCurrentPages(whiteboardID: string, hPercent: number, vPercent: number): {
        minPage: number;
        maxPage: number;
    };
    private getPageGraphicsList;
    /** ?????????????????? */
    onRemotePush(): void;
    /**==================== socket ============================ */
    sendWbMessage(reqCmd: string | null, rspCmd: string, reqBody: {
        [index: string]: any;
    } | null, cb: (rspData: any, pushType?: PushType) => void): void;
    /**
     * req??????????????????cmd???
     * res?????????????????????cmd???
     * reqBody???????????????????????????????????????body???
     * cmdCallBack(headerSeq: number, bodyCmd: string, rspBody: any)
     * msg.header???msg.body????????????msg.body */
    queueWSCmdHandler<P = any>(reqCmd: string | null, rspCmd: string, reqBody: {
        [index: string]: any;
    } | null, cmdCallBack?: (cbParam1: P, cbParam2?: PushType) => void): Promise<P>;
    /**================== ?????? ========================= */
    private handleCreateModRsp;
    private handleGetModInfoRsp;
    private handleSetModRsp;
    private handleDestroyModRsp;
    private handleClearRsp;
    private compareHandle;
    private handleGetModListRsp;
    private handleGetPageGraphicsListRsp;
    private handleUpdateToRemoteRsp;
    private pushDrawPageGraphicsHandle;
    private pushClearPageGraphicsHandle;
    private pushAddMod;
    private pushRemovedMod;
    private pushModifyMod;
    private pushScrollHandle;
    private pushSetModHandle;
}
export {};
