import React from 'react'

import { SubHeader } from 'components'

import { SearchArtistBox } from 'components'

import styles from './Search.module.css'

class Search extends React.Component {
    
    render() {

        return (
            <React.Fragment>
                <SubHeader
                    breadcrumb={[{ text: 'Home' }]}
                    heading={"Encontre seu artista favorito"}
                />
                <div className={styles.wrapper}>
                    <SearchArtistBox />
                </div>
            </React.Fragment>
        )
    }
}

export default Search