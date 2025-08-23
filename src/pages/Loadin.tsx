

import { FiLoader } from "react-icons/fi";

const Loading = () => {
    return (
        <div className="h-2/3 w-full flex justify-center items-center">
            <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
        </div>
    );
};

export default Loading;
