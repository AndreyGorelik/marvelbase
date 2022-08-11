import './charList.scss';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

function CharList(props) {

    const [charList, setCharList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setOffset(offset => offset + 9)
        setNewItemLoading(false)
        setCharEnded(ended)
    }


    const elementsContent = charList.map(item => {

        let objFit = null;
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            objFit = {
                objectFit: "unset"
            }
        }

        return (
            <li className="char__item" key={item.id} onClick={() => props.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt={item.name} style={objFit} />
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    const loadingContent = loading && !newItemLoading ? <Spinner /> : null;
    const errorContent = error ? <ErrorMessage /> : null;
    

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadingContent}
                {errorContent}
                {elementsContent}
            </ul>
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;