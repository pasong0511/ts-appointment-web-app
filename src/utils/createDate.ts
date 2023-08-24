import { WEEK_LIST, WEEK_LIST_KR } from "../enums/date";
import { ILastDate, IViewDate } from "../types/date";

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
            year: nextDate.year,
            month: nextDate.month,
            day: i,
            week: WEEK_LIST[(thisDate.week + i) % 7],
            week_kr: WEEK_LIST_KR[(thisDate.week + i) % 7],
        });
    }

    return dateList;
};
