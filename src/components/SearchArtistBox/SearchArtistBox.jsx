import React, { Component } from 'react'
import styles from './SearchArtistBox.module.css'

import { ClientRes, getToken } from 'utils'

import { ReactComponent as SearchIcon } from 'assets/search-icon.svg'
import { ReactComponent as StarIcon } from 'assets/star-icon.svg'

import ErrorBoundary from 'ErrorBoundary'

class SearchArtistBox extends Component {

    constructor() {
        super()
        this.state = { info: {} }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let search = event.target.value

        if (search !== undefined) {
            if (search.length > 3) {
                new ClientRes({
                    accessToken: getToken()
                }).getArtists(search)
                    .then(res => this.setState({
                        info: res
                    }))

            }
        }
    }
    handleSubmit(event) {
        event.preventDefault()
        let search = event.target.searchInput.value
        if (search !== undefined) {
            if (search !== '') {
                new ClientRes({
                    accessToken: getToken()
                }).getArtists(search)
                    .then(res => this.setState({
                        info: res
                    }))
            }
        }
    }

    render() {


        const { searchContainer,
            searchInputContent,
            searchInputFomr,
            searchIcon,
            searchInput,
            searchSubmit,
            searchBody,
            artistsList,
            artists,
            artistWithoutSearch,
            wImage } = styles

        return (
            <div className={searchContainer}>
                <div className={searchInputContent}>
                    <form className={searchInputFomr} onSubmit={this.handleSubmit}>
                        <label htmlFor="searchInput">
                            <SearchIcon className={searchIcon} />
                        </label>
                        <input className={searchInput}
                            type="search"
                            name="search"
                            id="searchInput"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <input className={searchSubmit}
                            type="submit"
                            value="Buscar" />
                    </form>
                </div>
                <ErrorBoundary>
                    <div className={searchBody}>
                        {
                            this.state.info !== undefined ? this.state.info && (
                                <ul className={artistsList}>
                                    {this.state.info.items !== undefined ?
                                        this.state.info.items
                                            .map((artist) => (

                                                <li key={artist.id}>
                                                    {
                                                        artist.images[1] ?
                                                            <img src={artist.images[1] === undefined ? ''
                                                                :
                                                                artist.images[1].url} alt="null" />
                                                            :
                                                            <div className={wImage}></div>
                                                    }
                                                    <div className={artists}>
                                                        <span>{artist.name}</span>
                                                        <div>
                                                            <StarIcon />
                                                            <span>{artist.popularity}</span>
                                                        </div>
                                                    </div>
                                                    <a href={'/artist/' + artist.id}>Detalhes</a>
                                                </li>
                                            ))
                                        :
                                        (
                                            <div className={artistWithoutSearch}>
                                                <p>Procure um Artista</p>
                                            </div>
                                        )
                                    }
                                </ul>
                            )
                                :
                                <div><p>Carregando...</p></div>

                        }
                    </div>
                </ErrorBoundary>
            </div>
        )
    }
}

export default SearchArtistBox