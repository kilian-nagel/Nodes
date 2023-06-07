
/**
 * return an array of all the months of the year
 * 
 * @returns an array of months
 */
export function getAllMonths():string[]{
    return ["january","february","march","april","may","june","july","august","september","october","november","december"];
}

/**
 * Converts milliseconds to another. Takes a number parameter in milliseconds. Differents formats are : "seconds" , "minutes" , "hours" ,"days".
 * 
 * @param n milliseconds ( date.getTime() )
 * @param format it specifies the kind of format the date should be converted to.
 * 
 * @returns 
 */
export function convertDate(n:number,format:string):number{
    switch(format){
        case "seconds":
            return new Date(n).getTime()/1000;
        case "minutes":
            return new Date(n).getTime()/1000/60;
        case "hours":
            return new Date(n).getTime()/1000/360;
        case "days":
            return new Date(n).getTime()/1000/360/24;
        default : 
            throw new Error("incorrect format");
    }
}

/**
 * converts a date to a more human readable format.
 */
export function dateToString(date:Date):string{
    date = new Date(date);
    const dateInMilliseconds:number = date.getTime();
    const months = getAllMonths();
    let text:string = "";

    try {
        const differenceInMinutes:number = convertDate(dateInMilliseconds,"minutes");
        const differenceInHours:number = convertDate(dateInMilliseconds,"hours");
        const differenceInDays:number = convertDate(dateInMilliseconds,"days");
        
        text = differenceInMinutes+"min";
        if(differenceInHours>=1){text=differenceInHours+" h";}
        if(differenceInDays>=1){text=date.getDay()+" "+months[date.getMonth()];}
    }catch(e){
        console.error(e);
        text="";
    }

    return text;
}