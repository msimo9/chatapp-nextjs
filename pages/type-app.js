import Link from "next/link"
import { useRouter } from "next/router";
import react, {useState, useEffect} from "react";
import useEventListener from '@use-it/event-listener'
import { NextResponse, NextRequest } from 'next/server'

import randomWords from "./api/randomWords";

const TypeApp = () => {
    const keyboardKeys = [
        ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "š", "đ"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "č", "ć", "ž"],
        ["y", "x", "c", "v", "v", "b", "n", "m"],
    ]
    const router = useRouter();
    const data = router.query;
    let bgStyle="w-screen h-screen flex flex-col justify-center items-center ";
    bgStyle += data.color;

    const mode = data.type;
    const value = data.value;

    //__________WORDS GENERATOR________________
    const [words, setWords] = useState([]);
    const [wordsReady, setWordsReady] = useState(false);
    const [errorCount, setErrorCount] = useState(0);
    const [wordsLeft, setWordsLeft] = useState(mode === "count" ? value : 100);



    const generateWords = () => {
        let tempArr = randomWords.sort(() => (Math.random() > .5) ? 1 : -1);
        let numberOfWords = 0;
        if(mode === "count"){
            numberOfWords = value;
        }else{
            numberOfWords = 100;
        }
        tempArr.length = numberOfWords;
        /*for(let i=0; i<numberOfWords; i++){
            let randomNumber = Math.floor(Math.random()*randomWords.length-1);
            tempArr.push(randomWords[randomNumber]);
        }*/
        setWords(tempArr);
        setWordsReady(!wordsReady);
    }

    useEffect(() => {
        generateWords();
    }, [])
    useEffect(() => {}, [wordsReady, words, errorCount]);

    const handleFinishedGame = () => {
        router.push({
            pathname: '/home-page',
            query: { }
        });
    }

    //_________EVENT LISTENER FOR KEYBOARD__________________
    const [pressedKey, setPressedKey] = useState("");
    function handler({ key }) {
        if(words.length !== 0){
            setPressedKey(key);
            if(key === words[0].charAt(0)){
                let word = words[0];
                let tempArr = words;
                word = word.substring(1, word.length);
                if(word === ""){
                    tempArr.shift();
                    let tempCount = wordsLeft;
                    tempCount --;
                    setWordsLeft(tempCount);
                }else{
                    tempArr.shift();
                    tempArr.unshift(word);
                }
                if(tempArr.length !== 0){
                    setWords(tempArr);
                }else{
                    handleFinishedGame();
                }
            }else{
                let tempCount = errorCount;
                tempCount += 1;
                setErrorCount(tempCount);
            }
        }
    }
    useEventListener('keydown', handler);

    //_______SET INTERVAL__________
    const [underline, setUnderline] = useState(true);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setUnderline(!underline);
            setPressedKey("");
        }, 500)
        return () => clearInterval(intervalId);
    }, [underline]);

    //IF MODE === TIMED __________________
    const [timeLeft, setTimeLeft] = useState(value);
    useEffect(() => {
        if(mode === "timed" && timeLeft > 0){
            const intervalId = setInterval(() => {
                let tempTime = timeLeft;
                tempTime--;
                setTimeLeft(tempTime);
                console.log(timeLeft)
            }, 1000)
        return () => clearInterval(intervalId);
        }else if(timeLeft === 0){
            handleFinishedGame();
        }
    }, [timeLeft]);
    
    return(
        <>
            <div className={bgStyle} >
                {
                    wordsReady &&
                    <div className="absolute top-6 w-screen h-auto justify-center items-center flex">
                        error count: {errorCount}
                    </div>
                }
                {
                    wordsReady && mode==="timed" &&
                    <div className="absolute top-12 w-screen h-auto justify-center items-center flex">
                        time left: {timeLeft}
                    </div>
                }
                {
                    wordsReady && mode==="count" &&
                    <div className="absolute top-12 w-screen h-auto justify-center items-center flex">
                        words left: {wordsLeft}
                    </div>
                }
                {
                    wordsReady &&
                    <div className="text-sm tracking-wide w-4/5 justify-start items-center flex overflow-hidden space-x-2">
                        {words.map((item, index) => {
                            return(
                                <div key={index}>
                                    {
                                        index === 0 
                                        ?<div>
                                            {underline &&
                                            <span className="border-b-2 border-b-black">
                                                {item.substring(0,1)}
                                            </span>
                                            }
                                            {!underline &&
                                            <span className="">
                                                {item.substring(0,1)}
                                            </span>
                                            }
                                            <span>
                                                {item.substring(1,item.length)}
                                            </span>{' '}</div>
                                        :<div><span>{item}</span>{' '}</div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className="absolute bottom-0 w-screen h-64 flex justify-center items-center">
                <div className="w-1/2 h-4/5 flex flex-col text-black space-y-8 justify-center items-center">
                    {keyboardKeys.map((item, index) =>{
                        let rowStyle = "flex flex-row space-x-4 ";
                        /*
                            if(index === 0){
                                rowStyle += "pl-0";
                            }else if(index === 1){
                                rowStyle += "pl-2";
                            }else{
                                rowStyle += "pl-6";
                            }
                        */
                        return(
                            <div
                                className={rowStyle}
                                key={index}    
                            >
                                {
                                    item.map((subitem, index) => {
                                        return(
                                            subitem !== pressedKey ?
                                            <div key={index} className="w-8 h-8 bg-gray-100 flex justify-center items-center text-black rounded-lg">{subitem}</div>
                                            :<div key={index} className="w-8 h-8 bg-gray-500 flex justify-center items-center text-white rounded-lg">{subitem}</div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="absolute bottom-2 left-2 text-sm shadow-2xl font-light mt-6 hover:cursor-pointer">
                <Link href="/home-page">
                    <a>go back.</a>
                </Link>
            </div>  
        </>
    )
}

export default TypeApp;