import './charList.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newItemLoading: false,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    //посылаем запрос на сервер и получаем массив с объектами
    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    //принимаем массив с объектами и меняем стейт
    //1 раз: в новом стейте - первые 9 объектов
    //offset увеличиваем на 9
    //послеющий разы: нажимаем кнопку load more, вызываем onRequest
    //

    onCharListLoaded = (newCharList) => {

        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ charList, offset }) => {
            return {
                charList: [...charList, ...newCharList],
                loading: false,
                offset: offset + 9,
                newItemLoading: false,
                charEnded: ended
            }
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { charList, loading, error, offset, newItemLoading,charEnded } = this.state;

        const elementsContent = charList.map(item => {

            let objFit = null;
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                objFit = {
                    objectFit: "unset"
                }
            }

            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={objFit} />
                    <div className="char__name" >{item.name}</div>
                </li>
            )
        })

        const loadingContent = loading ? <Spinner /> : null;
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
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;