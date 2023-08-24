import { useEffect, useState } from "react";
import { WEEK_LIST, WEEK_LIST_KR } from "../enums/date";
import { ILastDate, IViewDate } from "../types/date";
import { createDate } from "../utils/createDate";

export default function Calandar() {
    const [viewDate, setViewData] = useState<IViewDate[]>([]);

    useEffect(() => {
        const date = createDate(2023, 7);
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
