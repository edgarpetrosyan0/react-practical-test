
// TODO make all custom function implementation in the global.context.ts file there have example
interface Date {
  add(value: number, unit: 'days' | 'months' | 'years'): Date;
  subtract(value: number, unit: 'days' | 'months' | 'years'): Date;
  sum(otherDate: Date): Date;
  difference(otherDate: Date): number;
  eachDayOfInterval(endDate: Date): Array<Date>;
  log(): undefined
};

// TODO implement promise.all function but with small changes
// so example pas argument -> [promise, promise] call second promise after first promise resolving


interface PromiseConstructor {
  allWithMode<T>(
    promises: Array<Promise<T> | ((res?: any) => Promise<T>)>,
    mode: 'recursive'
  ): Promise<T[]>;
};

// little research
Promise.allWithMode = async function (items, mode) {
  const results = [];
  let lastResult = undefined;

  if (mode === 'recursive') {
    for (const item of items) {
      let result;

      if (typeof item === 'function') {
        result = await item(lastResult);

      } else {
        result = await item;
      }

      results.push(result);
      lastResult = result;
    }

    return results;
  } else {
    throw new Error("Only 'recursive' mode");
  }
};


type Size = "small" | "middle" | "large";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string

  // "id": 7,
  // "email": "michael.lawson@reqres.in",
  // "first_name": "Michael",
  // "last_name": "Lawson",
  // "avatar": "https://reqres.in/img/faces/7-image.jpg"
}

type FormFields = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string;
  password: string;
};
