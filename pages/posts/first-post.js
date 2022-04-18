import Link from "next/link"

export default function FirstPost() {
    return(
        <>
            <h1>First post!</h1>
            <div>
                <p>
                    Go back to{' '}
                    <Link href="/">
                        <a className="text-blue-500 font-bold text-xl shadow-2xl hover:text-green-500 duration-500 transition-all">
                            main page
                        </a>    
                    </Link>
                    .
                </p> 
            </div>
        </>
    )
}