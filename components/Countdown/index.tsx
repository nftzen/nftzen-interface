import React, { useEffect, useState } from "react";
import moment from "moment";

export const Countdown = ({date}) => {
    // date - now, update every sec.
    // const date = moment().add(10, 'days').toDate()
    const toDate:Date = date;
    const [ timeLeft, setTimeLeft ] = useState(getTimeLeft(toDate));

    console.log('timeLeft', timeLeft);

    function getTimeLeft(toDate: Date){
        const now = new Date();
        return toDate.getMilliseconds() - now.getMilliseconds();
    }
    
    // useEffect(()=>{
    //     const myInterval = setTimeout(()=>{
    //         // const newTime = moment(timeLeft).subtract(1, 'second').toDate()
    //         console.log('set new time', getTimeLeft(toDate));
            
    //         setTimeLeft(getTimeLeft(toDate))
    //     }, 1000)
    //     // return ()=> {
    //     //     clearInterval(myInterval);
    //     //   };
    // })  // <-- return empty array so it only runs once

  return (
    <div>
        {moment.unix(timeLeft).format('HH:mm:ss')}
    </div>
  );
};

export default Countdown;
