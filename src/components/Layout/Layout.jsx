import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Footer } from 'components'
import { NavBar } from 'components'

import { setToken } from 'utils'

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
          <NavBar />
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
