export interface ILastDate {
    year: number;
    month: number;
    LastDay: number;
    week: number;
}

export interface IViewDate {
    full: string;
    year: number;
    month: number;
    day: number;
    week: string;
    week_kr: string;
    thisMonth: boolean;
    today: boolean;
}

export interface IInfomationViewDate extends IViewDate {
    holiday: boolean;
    holiday_name: string | null;
    restDay: boolean;
    active: boolean;
}

export interface IHolidayAPIData {
    response: {
        body: {
            items: {
                item: IHolidyDate[];
            };
        };
    };
}

export interface IHolidyDate {
    dateKind: string;
    dateName: string;
    isHoliday: string;
    locdate: string;
    seq: number;
}

export interface IHolidayDic {
    [key: string]: IHolidyDate;
}
