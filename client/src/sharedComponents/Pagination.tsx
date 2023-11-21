import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { TbReload } from "react-icons/tb";

interface Props {
  goToPreviousWeek: () => void;
  goToCurrentWeek: () => void;
  goToNextWeek: () => void;
  getWeekNumber: (date: Date) => string;
  realCurrentDate: Date;
  nextWeekDate: Date;
  previousWeekDate: Date;
}

const Pagination: React.FC<Props> = ({
  goToPreviousWeek,
  getWeekNumber,
  realCurrentDate,
  nextWeekDate,
  previousWeekDate,
  goToCurrentWeek,
  goToNextWeek,
}) => {
  return (
    <div className="sticky right-0 left-0 z-10 bottom-0 flex flex-row justify-center">
      {/* Previous week: example week 45 */}
      <div
        onClick={goToPreviousWeek}
        className="flex flex-col items-center justify-start md:text-sm text-xs border min-w-[40px] w-full border-gray-300 cursor-pointer sm:px-4 pr-[5px] py-[10px] gap-[3px] bg-[#F7F7F7]"
      >
        <button>
          <BsFillArrowLeftCircleFill size={22} />
        </button>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-1">
          <p className="text-xs font-semibold">Week</p>
          <p className="text-xs font-semibold">{getWeekNumber(previousWeekDate)}</p>
        </div>
      </div>
      {/* Current week: example week 46 */}
      <div
        onClick={goToCurrentWeek}
        className="flex flex-col items-center justify-center md:text-sm text-xs border w-full border-gray-300 cursor-pointer bg-[#F7F7F7] gap-[3px] py-[10px]"
      >
        <button className="bg-gray-600 p-[3px] text-gray-200 rounded-[50%] h-[22px] w-[22px] flex items-center justify-center">
          <TbReload size={22} />
        </button>
        <div className="flex flex-col items-center justify-center text-center sm:flex-row gap-1">
          <p className="text-xs font-semibold">Current Week</p>
          <p className="text-xs font-semibold">{getWeekNumber(realCurrentDate)}</p>
        </div>
      </div>
      {/* Next week: example week 47 */}
      <div
        onClick={goToNextWeek}
        className="flex flex-col items-center justify-start md:text-sm text-xs border min-w-[40px] w-full border-gray-300 cursor-pointer sm:px-4 pr-[5px] py-[10px] gap-[3px] bg-[#F7F7F7]"
      >
        <button>
          <BsFillArrowRightCircleFill size={22} />
        </button>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-1">
          <p className="text-xs font-semibold">Week</p>
          <p className="text-xs font-semibold">{getWeekNumber(nextWeekDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
