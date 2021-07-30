import React from 'react'

import styles from './NavBar.module.css'

import { setToken } from 'utils'

import { ReactComponent as MenuIcon } from '../../assets/list-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg'

import artifyLogo from '../../assets/artifyLogo.png'

class NavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = { openClose: false }
        this.setStateMenu = this.setStateMenu.bind(this)
    }

    componentDidMount() {
        console.log('clicou')
        this.setState({ openClose: !this.state.openClose })
    }
    logout(path) {
        setToken('')
        window.location = path
    }

    setStateMenu() {
        this.componentDidMount()
    }

    render() {
        let openClose = this.state.openClose
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
                    {openClose ?
                        (
                            <button onClick={this.setStateMenu}>Menu <MenuIcon /></button>
                        )
                        :
                        (
                            <div>
                                <button onClick={this.setStateMenu}><p>Fechar </p><CloseIcon /></button>
                                <ul className={MenuMobile}>
                                    <li><a href="/">Início</a></li>
                                    <li><a href="/buscar">Buscar</a></li>
                                    <li><a href="/" onClick={this.logout}>Sair</a></li>

                                </ul>
                            </div>
                        )
                    }
                    <ul className={MenuDesktop}>
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