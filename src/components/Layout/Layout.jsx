import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Footer } from 'plurall-footer'
import NavBar from 'plurall-header'

import { getToken, setToken } from 'utils'

import styles from './Layout.module.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }


  handleLogout = path => {
    setToken('')
    window.location = path
  }

  render() {
    const {
      props: { children }
    } = this

    const { content, footer, 'nav-bar': navBar } = styles

    return (
      <>
        <div className={navBar}>
          <NavBar
            data={{
              menu: {
                items: [{ name: 'Início', slug: 'account', id: 0, href: '/' },
                { name: 'Buscar', slug: 'search', id: 1, href: '/buscar' },
                { name: 'Sair', slug: 'sair', id: 2, }]
              },
            }}
            logout={this.handleLogout}
            service="reader"
            userToken={getToken()}
          />
        </div>

        <div className={content}>{children}</div>

        <div className={footer}>
          <Footer />
        </div>
      </>
    )
  }
}

export default Layout
