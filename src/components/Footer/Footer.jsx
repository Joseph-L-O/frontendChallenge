import React from 'react'

import styles from './Footer.module.css'

class Footer extends React.Component{

    render(){

        const {Footer} = styles

        return(
            <div className={Footer}>
                <p>Joseph - Artify - Todos os direitos Reservados</p>
            </div>
        )
    }
}

export default Footer