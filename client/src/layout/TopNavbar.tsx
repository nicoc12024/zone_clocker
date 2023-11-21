const TopNavbar = () => {
  return (
    <div className="flex flex-col w-full bg-white text-gray-600">
      <div
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        className="flex justify-between items-center py-3 px-8"
      >
        <h1 className="text-3xl font-bold text-orange-600 block sm:hidden">ZC</h1>
        <h1 className="text-3xl font-bold text-orange-600 hidden sm:block">
          Zone Clocker
        </h1>
        <h2 className="text-xl">Admin</h2>
      </div>
    </div>
  );
};

export default TopNavbar;
