import { useEffect, useState } from "react";
import { WEEK_LIST, WEEK_LIST_KR } from "../enums/date";
import { ILastDate, IViewDate } from "../types/date";
import { createDate } from "../utils/createDate";
import axios from "axios";

function fetchDate() {
    const param = {
        solYear: 2023,
        solMonth: 8,
        _type: "json",
        ServiceKey: process.env.REACT_APP_PUBLIC_POTAL_KEY,
    };
    return axios.get(
        "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo",
        param as any
    );
}

export default function Calandar() {
    const [viewDate, setViewData] = useState<IViewDate[]>([]);
    const [holiday, setHoliDay] = useState([]);

    async function fetchAPI() {
        const response = await fetchDate();
        const data = response.data;

        console.log(data);

        setHoliDay(data);
    }

    useEffect(() => {
        const date = createDate(2023, 7);
        fetchAPI();
        setViewData(date);
    }, []);

    useEffect(() => {
        console.log(viewDate);
    }, [viewDate]);

    if (!viewDate) {
        return <></>;
    }

    return (
        <div>
            {viewDate.map((item) => (
                <div>{item.day}</div>
            ))}
        </div>
    );
}
