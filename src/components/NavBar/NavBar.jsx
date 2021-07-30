import React from 'react'

import styles from './NavBar.module.css'

import { setToken } from 'utils'

import artifyLogo from '../../assets/artifyLogo.png'

class NavBar extends React.Component {

    logout(path) {
        setToken('')
        window.location = path
    }

    render() {
        const {
            HeaderContainer,
            Logo,
            navBaritems,
            MenuDesktop,
            MenuMobile } = styles
        return (
            <div className={HeaderContainer}>
                <div className={Logo}>
                    <img src={artifyLogo} alt="" />
                </div>
                <div className={navBaritems}>
                    <ul className={MenuDesktop}>
                        <li><a href="/">Início</a></li>
                        <li><a href="/buscar">Buscar</a></li>
                        <li><a href="/" onClick={this.logout}>Sair</a></li>
                    </ul>
                    <ul className={MenuMobile}>
                        <li><a href="/">Início</a></li>
                        <li><a href="/buscar">Buscar</a></li>
                        <li><a href="/" onClick={this.logout}>Sair</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar