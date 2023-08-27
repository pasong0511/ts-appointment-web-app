import classnames from "classnames";
import { useEffect, useState } from "react";
import { WEEK_LIST_KR } from "../constants/calendarConstants";
import { IInfomationViewDate, IHolidayDic } from "../types/date";
import { fetchHolidyDate } from "../utils/api";
import { getCreateDateList } from "../utils/createDate";
import { Week } from "../enums/dateEnums";

export default function Calendar() {
    const date = new Date();
    const [viewDate, setViewData] = useState<IInfomationViewDate[]>([]);
    const [holiday, setHoliDay] = useState<IHolidayDic[]>();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [today, setToday] = useState(
        String(date.getFullYear()) +
            String(date.getMonth() + 1).padStart(2, "0") +
            String(date.getDate()).padStart(2, "0")
    );
    const [selectList, setSelectList] = useState<IInfomationViewDate[]>([]);

    async function fetchHolidyData() {
        const response = await fetchHolidyDate("getRestDeInfo", year);
        const holidyDates = response.data.response.body.items.item;

        const mapHolidyDates = holidyDates.reduce<IHolidayDic>((acc, cur) => {
            acc[cur.locdate] = cur;
            return acc;
        }, {});

        setHoliDay([mapHolidyDates]);
    }

    //이전달(왼쪽)으로 이동하기
    const onClickPrev = () => {
        if (month > 1) {
            setMonth((prev) => prev - 1);
        } else {
            setYear((prev) => prev - 1);
            setMonth(12);
        }
    };

    //다음달(오른쪽)으로 이동하기
    const onClickNext = () => {
        if (month >= 12) {
            setYear((prev) => prev + 1);
            setMonth(1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    const onClickDay = (dayItem: IInfomationViewDate) => {
        setSelectList((prevState) => {
            //const isSelectDate = prevState.includes(dayItem);
            const isSelectDate = prevState.find(
                (item) => item.full === dayItem.full
            );

            if (isSelectDate) {
                return prevState.filter((item) => item.full !== dayItem.full);
            }

            return [...prevState, dayItem];
        });
    };

    useEffect(() => {
        fetchHolidyData();
    }, [year]);

    useEffect(() => {
        if (holiday) {
            const dateList = getCreateDateList(year, month - 1, today, holiday); //계산돌릴때는 날자가 인덱스 0부터 시작해서 -1 해줘야함
            setViewData(dateList);
        }
    }, [year, month, today, holiday]);

    useEffect(() => {
        console.log("🎈🎈", selectList);
    }, [selectList]);

    if (!viewDate) {
        return <></>;
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div>
                    <span>{year}년</span>
                    <span>{month}월</span>
                </div>
                <div>
                    <button onClick={onClickPrev}>←</button>
                    <button onClick={onClickNext}>→</button>
                </div>
            </div>
            <div className="calendar-body">
                <div className="calendar-week">
                    {WEEK_LIST_KR.map((week) => (
                        <div key={week}>{week}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {viewDate.map((item) => (
                        <div
                            onClick={() => onClickDay(item)}
                            key={item.full}
                            className={classnames("day", {
                                thisMonth: item.thisMonth,
                                "not-thisMonth": !item.thisMonth,
                                sunday:
                                    item.thisMonth && item.week === Week.SUN,
                                saturday:
                                    item.thisMonth && item.week === Week.SAT,
                                holiday: item.thisMonth && item.holiday,
                            })}
                        >
                            <div
                                className={classnames("", {
                                    select: selectList.find(
                                        (select) => select.full === item.full
                                    ),
                                })}
                            >
                                <div className="grid-cell-header">
                                    <p>{item.day}</p>
                                    <p>{item.holiday_name}</p>
                                    <p
                                        className={classnames("", {
                                            "today-mark": item.today,
                                        })}
                                    ></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
