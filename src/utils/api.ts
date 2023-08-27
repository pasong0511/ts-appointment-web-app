import axios from "axios";
import { IHolidayAPIData } from "../types/date";

export function fetchHolidyDate(path: string, year: number) {
    const API_URL = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/${path}?`;
    return axios.get<IHolidayAPIData>(
        API_URL +
            `solYear=${year}&numOfRows=100&ServiceKey=` +
            process.env.REACT_APP_PUBLIC_POTAL_KEY
    );
}
