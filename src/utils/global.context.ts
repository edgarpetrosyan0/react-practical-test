// TODO added all custom methods (which have been announced global.d.ts file) in the Date prototype

/* eslint-disable no-extend-native */
export {};

Date.prototype.add = function (value: number, unit: 'days' | 'months' | 'years'): Date {
    const newDate = new Date(this);

    if (unit === 'days') {
        newDate.setDate(newDate.getDate() + value);
    } else if (unit === 'months') {
        newDate.setMonth(newDate.getMonth() + value);
    } else if (unit === 'years') {
        newDate.setFullYear(newDate.getFullYear() + value);
    }

    return newDate;
};

Date.prototype.subtract = function (value: number, unit: 'days' | 'months' | 'years'): Date {
    return this.add(-value, unit);
};

Date.prototype.sum = function (otherDate: Date): Date {
    return new Date(this.getTime() + otherDate.getTime());
};

Date.prototype.difference = function (otherDate: Date): number {
    const diffMilliseconds = Math.abs(this.getTime() - otherDate.getTime());
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    return Math.ceil(diffMilliseconds / millisecondsInADay);
};


Date.prototype.log = function (): undefined {
    console.log(this.toISOString());
    return;
};


// Array.prototype.toUpperCase = function() {
//     return this.map(element => element.toUpperCase());
// };
// export { };

// export function subtractFromDate(date: Date, value: number, unit: 'days' | 'months' | 'years'): Date {
//     return addToDate(date, -value, unit);
//   }
  
//   export function sumDates(date1: Date, date2: Date): Date {
//     return new Date(date1.getTime() + date2.getTime());
//   }