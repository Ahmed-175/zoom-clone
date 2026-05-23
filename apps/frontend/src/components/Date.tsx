import { useEffect, useState } from "react";

const DateComponent = () => {

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return (
        <div>
            <h2 className=" text-xl">
                {days[time.getDay()]} ,
                {" "}
                {time.getDate()}
                {" "}
                {months[time.getMonth()]}
                {" "}
                {time.getFullYear()}
            </h2>

        </div>
    );
}

export default DateComponent;