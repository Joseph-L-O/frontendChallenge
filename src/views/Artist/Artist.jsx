import React from 'react'

import { SubHeader } from 'components'
import { ClientRes, getToken } from 'utils'

import styles from './Artist.module.css'

import { ReactComponent as StarIcon } from 'assets/star-icon.svg'
import ErrorBoundary from 'ErrorBoundary'

class Artist extends React.Component {

    constructor(props) {
        super(props)
        this.state = { artist: '', albums: '', albumsid: '', albumsContent: '', time: 3000 }
        this.artistData = this.artistData.bind(this)
        this.albumsData = this.albumsData.bind(this)
        this.albumsContent = this.albumsContent.bind(this)
    }
    client = new ClientRes({
        access_token: getToken()
    })
    componentDidMount() {
        const artistid = window.location.href.split('/')[4]

        this.client.getArtistContent(artistid)
            .then((r) => { this.setState({ artist: r }) })
        this.client.getArtistAlbums(artistid)
            .then((r) => {
                this.setState({ albums: r })
                this.loadAlbumsContent()
            })

    }
    loadAlbumsContent() {
        let albumList = this.state.albums.items
        let albumArray = []
        if (albumList !== undefined) {
            albumList.splice(0, 10).forEach(res => {
                this.client.getAlbumContent(res.id)
                    .then((r) => {
                        albumArray.push(r)
                        this.setState({ albumsContent: albumArray })
                    })
            })
        }
    }
    artistData() {
        if (this.state.artist !== undefined)
            return this.state.artist
    }

    albumsData() {
        if (this.state.albums.items !== undefined) {
            return this.state.albums.items
        }
    }


    albumsContent() {
        if (this.state.albumsContent !== '')
            return this.state.albumsContent
    }
    render() {

        let artistData = this.artistData()

        let albumsData = this.albumsContent()

        let albumsContent = this.albumsContent()

        return (
            <React.Fragment>
                <SubHeader
                    breadcrumb={[{ text: 'Artista' }]}
                    heading={artistData.name === undefined ? '' : artistData.name}
                />
                <div className={styles.wrapper}>
                    <div className={styles.container}>

                        {
                            artistData.images === undefined ?
                                <div></div>
                                :
                                (
                                    <div className={styles.Content}>
                                        <div className={styles.headContent}>
                                            <img src={artistData.images[0].url} alt={artistData.name} />
                                            <div className={styles.headContentTexts}>
                                                <div className={styles.namePop}>
                                                    <h1>{artistData.name}</h1>
                                                    <div className={styles.Pop}>
                                                        <StarIcon />
                                                        <h2>{artistData.popularity}</h2>
                                                    </div>
                                                </div>
                                                <div className={styles.followersGenre}>
                                                    <p>Seguidores: {artistData.followers === undefined ? '' : artistData.followers.total}</p>
                                                    <p>({artistData.genres.map((ge) => { return ge })})</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ErrorBoundary>
                                            <div className={styles.albumsContent}>
                                                <h2>Álbuns</h2>
                                                <div className={styles.albumList}>
                                                    {
                                                        albumsData === undefined ?
                                                            <div>Ocorreu um erro</div>
                                                            :
                                                            albumsData.map((album, key) => (

                                                                <div className={styles.albumContent} key={album.id}>
                                                                    <img src={album.images[0].url} alt={album.name} />
                                                                    <div className={styles.albumText}>
                                                                        <h3>{album.name}</h3>
                                                                        <p>{album.release_date.split('-')[2] + '/' +
                                                                            album.release_date.split('-')[1] + '/' +
                                                                            album.release_date.split('-')[0]}</p>
                                                                        <a href={album.external_urls.spotify}>Ouça agora!</a>
                                                                    </div>
                                                                    <div className={styles.albumPop}>
                                                                        <StarIcon />
                                                                        {

                                                                            <h2>
                                                                                {
                                                                                    albumsContent[0] === undefined ? '' : albumsContent[key] === undefined ? '' : albumsContent[key].popularity
                                                                                }
                                                                            </h2>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))

                                                    }
                                                </div>
                                            </div>
                                        </ErrorBoundary>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Artist