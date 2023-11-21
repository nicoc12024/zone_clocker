import { Link } from "react-router-dom";

interface MainTitleAndButtonActionProps {
  title: string;
  callToAction?: string;
  openModal?: () => void;
  url?: string;
}

export default function MainTitleAndButtonAction({
  title,
  callToAction,
  openModal,
  url,
}: MainTitleAndButtonActionProps) {
  return (
    <>
      <h1 className="font-medium sm:text-2xl text-md text-gray-600">{title}</h1>
      {callToAction && (
        <div className="h-[30px] w-[1.3px] bg-gray-200 sm:block hidden"></div>
      )}
      {callToAction && openModal && (
        <button
          onClick={openModal}
          className="bg-orange-600 text-white text-xs py-[4px] px-[10px] rounded"
        >
          {callToAction}
        </button>
      )}
      {callToAction && url && (
        <Link
          to={`/${url}`}
          className="bg-orange-600 text-white text-xs py-[4px] px-[10px] rounded"
        >
          {callToAction}
        </Link>
      )}
    </>
  );
}
