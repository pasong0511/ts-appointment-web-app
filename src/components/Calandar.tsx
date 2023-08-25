import { useEffect, useState } from "react";
import { WEEK_LIST, WEEK_LIST_KR, WEEK_LIST_KR_LIST } from "../enums/date";
import { ILastDate, IViewDate } from "../types/date";
import { createDate } from "../utils/createDate";
import axios from "axios";

function fetchDate() {
    const param = {
        solYear: 2023,
        solMonth: 8,
        _type: "json",
        ServiceKey:
            "cK2GBHGuJ7z5tzMMucvtIx2As8IdqXQgBGwIsaBIkkLNRvD%2FYxw2dlBb6twoQEGB1CDczqaWcq0FLA4rnrIs6g%3D%3D",
    };
    return axios.get(
        "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo",
        param as any
    );
}

export default function Calandar() {
    const date = new Date();
    const [viewDate, setViewData] = useState<IViewDate[]>([]);
    const [holiday, setHoliDay] = useState([]);
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);

    async function fetchAPI() {
        const response = await fetchDate();
        const data = response.data;
        console.log(data);
        setHoliDay(data);
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

    const resetDate = (viewYear: number, viewMonth: number) => {
        setYear(viewYear);
        setMonth(viewMonth + 1);
    };

    useEffect(() => {
        // const h = fetchAPI();
        // console.log(h);

        const dateList = createDate(year, month - 1); //계산돌릴때는 날자가 인덱스 0부터 시작해서 -1 해줘야함
        setViewData(dateList);
    }, []);

    useEffect(() => {
        const dateList = createDate(year, month - 1); //계산돌릴때는 날자가 인덱스 0부터 시작해서 -1 해줘야함
        setViewData(dateList);
    }, [year, month]);

    useEffect(() => {
        // console.log(viewDate);
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
                        <div key={item.full}>{item.day}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
