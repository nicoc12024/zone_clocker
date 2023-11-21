export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="py-3.5 px-3 text-left text-xs font-bold text-gray-600 border-r border-gray-200">
          Name
        </th>
        <th className="py-3.5 px-3 text-left text-xs font-bold text-gray-600 border-r border-gray-200">
          Email
        </th>
        <th className="py-3.5 px-3 text-left text-xs font-bold text-gray-600 border-r border-gray-200">
          Password
        </th>
        <th className="py-3.5 px-3 text-left text-xs font-bold text-gray-600 border-r border-gray-200">
          Action
        </th>
      </tr>
    </thead>
  );
}
