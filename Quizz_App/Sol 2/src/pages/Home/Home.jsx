import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return <div className={'flex justify-center py-10 bg-blue-200 h-screen font-semibold'}>
        <div className={''}>
            <h1 className={'text-6xl py-4'}>Welcome to Quiz App</h1>
            <h3 className={'text-4xl flex justify-center py-7'}>It is a sample quiz.</h3>
            <div className={'flex justify-center py-9 font-bold'}>
                <button className={'border-2 px-8 py-3 text-2xl bg-blue-500 text-white transition-transform ' +
                                   'transform hover:scale-105 shadow-sm rounded-lg'}
                        onClick={() => {
                            navigate('/started')
                        }}>
                        Start Quiz
                </button>
            </div>
        </div>
    </div>
}

export default Home
