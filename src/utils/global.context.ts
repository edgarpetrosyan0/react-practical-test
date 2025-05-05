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

Date.prototype.subtract = function(days):Date {
    const currentDate = new Date(this);
    currentDate.setDate(this.getDate() - days);
    return currentDate;
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



// export function subtractFromDate(date: Date, value: number, unit: 'days' | 'months' | 'years'): Date {
//     return addToDate(date, -value, unit);
//   }
  
//   export function sumDates(date1: Date, date2: Date): Date {
//     return new Date(date1.getTime() + date2.getTime());
//   }

// Function.prototype.myBind = function(context, ...args) {
//     const fn = this;
//     return function(...newArgs) {
//         return fn.apply(context, [...args, ...newArgs]);
//     };
// };

// Array.prototype.myMap = function(callback, thisArg) {
//     const result = [];
//     for (let i = 0; i < this.length; i++) {
//         if (i in this) {
//             result.push(callback.call(thisArg, this[i], i, this));
//         }
//     }
//     return result;
// };

// Array.prototype.myFilter = function(callback, thisArg) {
//     const result = [];
//     for (let i = 0; i < this.length; i++) {
//         if (i in this) {  // skip holes in sparse arrays
//             const element = this[i];
//             if (callback.call(thisArg, element, i, this)) {
//                 result.push(element);
//             }
//         }
//     }
//     return result;
// };

