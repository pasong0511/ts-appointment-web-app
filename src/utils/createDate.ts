import { WEEK_LIST, WEEK_LIST_KR } from "../enums/date";
import { IInfomationViewDate, ILastDate, IViewDate } from "../types/date";

const createLastDate = (lastDate: Date): ILastDate => {
    const year = lastDate.getFullYear(); //년
    const month = lastDate.getMonth(); //월
    const LastDay = lastDate.getDate(); //날짜
    const week = lastDate.getDay(); //요일

    return {
        year,
        month,
        LastDay,
        week,
    };
};

export const createDate = (
    viewYear: number,
    ViewMonth: number
): IViewDate[] => {
    const prevDate = createLastDate(new Date(viewYear, ViewMonth, 0));
    const thisDate = createLastDate(new Date(viewYear, ViewMonth + 1, 0));
    const nextDate = createLastDate(new Date(viewYear, ViewMonth + 2, 0));

    let thisStartDay = -1;
    const dateList = [];

    for (let i = prevDate.LastDay - prevDate.week; i <= prevDate.LastDay; i++) {
        dateList.push({
            full: `${prevDate.year}${String(prevDate.month + 1).padStart(
                2,
                "0"
            )}${String(i).padStart(2, "0")}`,
            year: prevDate.year,
            month: prevDate.month + 1,
            day: i,
            week: WEEK_LIST[(i - prevDate.LastDay + prevDate.week) % 7],
            week_kr: WEEK_LIST_KR[(i - prevDate.LastDay + prevDate.week) % 7],
        });

        if (i === prevDate.LastDay) {
            thisStartDay = i - prevDate.LastDay + prevDate.week + 1;
        }
    }

    //1일부터 마지막 일까지 반복문 돌면서 만들기
    for (let i = 1; i <= thisDate.LastDay; i++) {
        dateList.push({
            full: `${thisDate.year}${String(thisDate.month + 1).padStart(
                2,
                "0"
            )}${String(i).padStart(2, "0")}`,
            year: thisDate.year,
            month: thisDate.month + 1,
            day: i,
            week: WEEK_LIST[(thisStartDay + (i - 1)) % 7],
            week_kr: WEEK_LIST_KR[(thisStartDay + (i - 1)) % 7],
        });
    }

    //다음달 초 가져옴
    for (let i = 1; i < 7 - thisDate.week; i++) {
        dateList.push({
            full: `${nextDate.year}${String(nextDate.month + 1).padStart(
                2,
                "0"
            )}${String(i).padStart(2, "0")}`,
            year: nextDate.year,
            month: nextDate.month + 1,
            day: i,
            week: WEEK_LIST[(thisDate.week + i) % 7],
            week_kr: WEEK_LIST_KR[(thisDate.week + i) % 7],
        });
    }

    return dateList;
};

export const addInfomationDate = (
    dateList: IViewDate[],
    holidayList: any
): IInfomationViewDate[] => {
    const holidayMap = holidayList[0];
    const newDate = dateList.map((item) => {
        return {
            ...item,
            holiday: !!holidayMap[item.full],
            holiday_name: !!holidayMap[item.full]
                ? holidayMap[item.full].dateName
                : null,
            restDay:
                item.week === "SUN" ||
                item.week === "SAT" ||
                !!holidayMap[item.full],
            active: false,
        };
    });

    return newDate;
};

export const getCreateDateList = (
    viewYear: number,
    ViewMonth: number,
    holidayList: any
): IInfomationViewDate[] => {
    const defaultDateList = createDate(viewYear, ViewMonth);
    const infomationDateList = addInfomationDate(defaultDateList, holidayList);

    console.log("👓👓👓", infomationDateList);

    return infomationDateList;
};
