export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-3"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600"
        >
          Action
        </th>
      </tr>
    </thead>
  );
}
