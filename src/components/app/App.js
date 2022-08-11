import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

function App () {

    const [selectedChar, setSelectedChar] = useState(null)
    

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

        return (
            <div className="app">
                <AppHeader/>
                <main>
                <ErrorBoundary>
                    <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <CharList onCharSelected={onCharSelected}/>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )

}

export default App;