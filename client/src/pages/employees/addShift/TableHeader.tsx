import { format } from "date-fns";

interface EachDayOfIntervalProps {
  start: Date;
  end: Date;
}

interface TableHeaderProps {
  eachDayOfInterval: (interval: EachDayOfIntervalProps) => Date[];
  startDate: Date;
  endDate: Date;
}

export default function TableHeader({
  eachDayOfInterval,
  startDate,
  endDate,
}: TableHeaderProps) {
  return (
    <thead>
      <tr>
        <th className="py-3.5 px-3 text-left text-xs font-semibold text-gray-600 border-r border-gray-200">
          Employee(s)
        </th>
        {eachDayOfInterval({ start: startDate, end: endDate }).map((day) => (
          <th
            key={day.toString()}
            className="py-3.5 px-3 min-w-[100px] text-center text-xs font-semibold text-gray-600 border-r border-gray-200"
          >
            <p>{format(day, "EEEE")}</p>
            <p>{format(day, "yyyy-MM-dd")}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
}
