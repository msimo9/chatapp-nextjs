import Link from "next/link";
import react, {useState} from "react";
import { Slider } from "@mui/material";
export default function HomePage() {
    const [timedModal, setTimedModal] = useState(false);
    const [countModal, setCountModal] = useState(false);
    const toggleTimedModal = () => {
        if(countModal)setCountModal(!countModal);
        setTimedModal(!timedModal);
    }
    const toggleCountModal = () => {
        if(timedModal) setTimedModal(!timedModal);
        setCountModal(!countModal);
    }
    const [bgColor, setBgColor] = useState("bg-blue-100");
    const twStyle = "w-screen h-screen flex justify-center items-center flex-col ";
    twStyle += bgColor;
    const buttonStyle = " py-2 px-4 bg-white border-2 border-white rounded-3xl hover:cursor-pointer w-36 flex justify-center items-center hover:w-40 duration-300 transition-all text-xs font-thin";
    const modalButtonStyle = " py-2 px-4 text-black border-2 border-white rounded-3xl hover:cursor-pointer w-28 flex justify-center items-center hover:w-40 duration-300 transition-all text-xs font-semibold ";
    modalButtonStyle += bgColor;

    const [customTime, setCustomTime] = useState(70);
    const handleTimeSliderChange = (value) => {
        setCustomTime(value);
    }
    const [customCount, setCustomCount] = useState(30);
    const handleCountSliderChange = (value) => {
        setCustomCount(value);
    }
    return(
        <div className={twStyle} >
            <div className="flex flex-col justify-center items-center space-y-6 font-light text-sm">
                <div className="flex flex-row justify-center items-center space-x-2">
                    <Link
                        href={{
                            pathname: `/type-app`,
                            query: {
                                color: bgColor,
                                type: "free",
                                value: 0,
                            },
                        }}
                    >
                        <div className={buttonStyle}>free practice</div>
                    </Link>
                    <div onClick={() => toggleTimedModal()} className={buttonStyle}>timed practice</div>
                    <div onClick={() => toggleCountModal()} className={buttonStyle}>word count</div>
                </div>
                <div className="flex flex-row justify-center items-center space-x-2 border-red-200">
                    {
                        timedModal &&
                        <div className="flex flex-col space-y-4 justify-center items-center space-x-2 w-64 mt-12">
                            <span>{customTime}{' '}seconds</span>
                            <Slider defaultValue={50} aria-label="seconds" value={customTime} onChange={(e) => handleTimeSliderChange(e.target.value)} valueLabelDisplay="auto" min={10} max={120} className="" />
                            <Link
                                href={{
                                    pathname: `/type-app`,
                                    query: {
                                        color: bgColor,
                                        type: "timed",
                                        value: customTime,
                                    },
                                }}
                            >
                                <div className={modalButtonStyle}>start!</div>
                            </Link>
                        </div>
                    }
                    {
                        countModal &&
                        <div className="flex flex-col space-y-4 justify-center items-center space-x-2 w-64 mt-12">
                            <span>{customCount}{' '}words</span>
                            <Slider defaultValue={50} aria-label="seconds" value={customCount} onChange={(e) => handleCountSliderChange(e.target.value)} valueLabelDisplay="auto" min={10} max={500} className="" />
                            <Link
                                href={{
                                    pathname: `/type-app`,
                                    query: {
                                        color: bgColor,
                                        type: "count",
                                        value: customCount,
                                    },
                                }}
                            >
                                <div className={modalButtonStyle}>start!</div>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <div className="absolute bottom-2 left-2 text-sm shadow-2xl font-light mt-6 hover:cursor-pointer">
                <Link href="/">
                    <a>go back.</a>
                </Link>
            </div>
            <div className="absolute bottom-2 right-2 text-sm shadow-2xl font-light mt-6 flex flex-row justify-center items-center space-x-2">
                <div onClick={() => setBgColor("bg-red-100")} className="w-4 h-4 rounded-full bg-red-100 border-2 border-white hover:cursor-pointer"></div>
                <div onClick={() => setBgColor("bg-blue-100")} className="w-4 h-4 rounded-full bg-blue-100 border-2 border-white hover:cursor-pointer"></div>
                <div onClick={() => setBgColor("bg-green-100")} className="w-4 h-4 rounded-full bg-green-100 border-2 border-white hover:cursor-pointer"></div>
                <div onClick={() => setBgColor("bg-orange-100")} className="w-4 h-4 rounded-full bg-orange-100 border-2 border-white hover:cursor-pointer"></div>
                <div onClick={() => setBgColor("bg-purple-100")} className="w-4 h-4 rounded-full bg-purple-100 border-2 border-white hover:cursor-pointer"></div>
            </div>
        </div>
    )
}