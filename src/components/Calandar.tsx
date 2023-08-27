import { useEffect, useState } from "react";
import { WEEK_LIST_KR_LIST } from "../enums/date";
import { IInfomationViewDate, IHolidayDic } from "../types/date";
import { fetchHolidyDate } from "../utils/api";
import { getCreateDateList } from "../utils/createDate";

export default function Calandar() {
    const date = new Date();
    const [viewDate, setViewData] = useState<IInfomationViewDate[]>([]);
    const [holiday, setHoliDay] = useState<IHolidayDic[]>();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);

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

    useEffect(() => {
        fetchHolidyData();
    }, [year]);

    useEffect(() => {
        if (holiday) {
            const dateList = getCreateDateList(year, month - 1, holiday); //계산돌릴때는 날자가 인덱스 0부터 시작해서 -1 해줘야함
            setViewData(dateList);
        }
    }, [year, month, holiday]);

    useEffect(() => {
        console.log("현재화면 날짜-->", viewDate);
    }, [viewDate]);

    if (!viewDate) {
        return <></>;
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={onClickPrev}>←</button>
                <div>{year}년</div>
                <div>{month}월</div>
                <button onClick={onClickNext}>→</button>
            </div>
            <div className="calendar-body">
                <div className="calendar-week">
                    {WEEK_LIST_KR_LIST.map((week) => (
                        <div key={week}>{week}</div>
                    ))}
                </div>
                <div className="calandar-grid">
                    {viewDate.map((item) => (
                        <div key={item.full}>
                            <p
                                style={{
                                    color: item.restDay ? "tomato" : "inherit",
                                }}
                            >
                                {item.day}
                            </p>
                            <p>{item.holiday_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
