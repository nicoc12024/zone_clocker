import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { toggleModalPagination } from "../../../slices/shift/shiftSlice";
import { endOfWeek, format, startOfWeek } from "date-fns";

const DAYS_IN_WEEK = 7;
const WEEKS_IN_PERIOD = 12;

export const usePagination = () => {
  const dispatch: AppDispatch = useDispatch();

  // Example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
  // this will increase or decrease by 7 days when we click on the next or previous week button
  const [currentDate, setCurrentDate] = useState(new Date());

  // Example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
  // this will always be the current date
  const [realCurrentDate, setRealCurrentDate] = useState(new Date());

  // eachDayOfInterval() returns an array of dates between the start and end dates
  // startOfWeek() returns the first day of the week for the given date
  // endOfWeek() returns the last day of the week for the given date
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  // used to update realCurrentDate at midnight if user doesn't refresh the page
  useEffect(() => {
    const scheduleUpdate = () => {
      const now = new Date();
      // Create a new Date object representing the next midnight
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      // Calculate the time in milliseconds until midnight
      const timeToMidnight = midnight.getTime() - now.getTime();

      // Set a timeout to update the date at midnight
      setTimeout(() => {
        setRealCurrentDate(new Date());
        scheduleUpdate();
      }, timeToMidnight);
    };

    scheduleUpdate();
  }, []);

  // by clicking this button we setCurrentDate to be the realCurrentDate(todays date, later todays week)
  // and by extension next and previous week works with "currentDate" then buttons will change the week number too
  const goToCurrentWeek = () => {
    setCurrentDate(new Date(realCurrentDate));
  };

  const goToNextWeek = () => {
    // Create nextWeek object and assign date with current date
    const nextWeek = new Date(currentDate);
    // setDate() method set the day of the month to a specified date (Friday)
    // we set the day of the month to be 7 days ahead of the current date (next Friday)
    // we move based on the day of the month, not of the date.
    nextWeek.setDate(nextWeek.getDate() + DAYS_IN_WEEK);
    // nextWeek for example: Fri Nov 17 2023 21:45:28 GMT+0100 (Central European Standard Time)
    // then nextWeek for example: Fri Nov 24 2023 21:45:28 GMT+0100 (Central European Standard Time)

    const twelveWeeksAhead = new Date(realCurrentDate);
    // this is the object is 84 days (12 weeks) ahead of the todays date
    // this will always be 84 days ahead of the todays date
    twelveWeeksAhead.setDate(twelveWeeksAhead.getDate() + WEEKS_IN_PERIOD * DAYS_IN_WEEK);

    // when comparing to date objects we need to use >= or <= so javascript can convert
    // them into milliseconds and compare
    if (nextWeek <= twelveWeeksAhead) {
      setCurrentDate(nextWeek);
    } else {
      dispatch(toggleModalPagination());
    }
  };

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - DAYS_IN_WEEK);
    const twelveWeeksBehind = new Date(realCurrentDate);
    twelveWeeksBehind.setDate(
      twelveWeeksBehind.getDate() - WEEKS_IN_PERIOD * DAYS_IN_WEEK
    );

    if (prevWeek >= twelveWeeksBehind) {
      setCurrentDate(prevWeek);
    } else {
      dispatch(toggleModalPagination());
    }
  };

  const previousWeekDate = new Date(currentDate);
  previousWeekDate.setDate(previousWeekDate.getDate() - DAYS_IN_WEEK);

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(nextWeekDate.getDate() + DAYS_IN_WEEK);

  const getWeekNumber = (date: Date) => {
    return format(date, "w");
  };

  return {
    getWeekNumber,
    nextWeekDate,
    previousWeekDate,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    realCurrentDate,
    currentDate,
    setCurrentDate,
    setRealCurrentDate,
    startDate,
    endDate,
  };
};
