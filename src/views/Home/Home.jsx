import React from 'react'

import { SubHeader } from 'components'
import { ClientRes, getToken } from 'utils'

import styles from './Home.module.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '' }
  }

  componentDidMount() {
    new ClientRes({ 
      access_token: getToken() 
    }).getUserName()
    .then((r) => { this.setState({ name: r }) })

  }
  render() {

    return (
      <React.Fragment>
        <SubHeader
          breadcrumb={[{ text: 'Home' }]}
          heading={"Bem vindo de volta " + this.state.name}
        />
        <div className={styles.wrapper}>
          <h2><a href="/buscar"> Buscar Artistas</a></h2>
        </div>
      </React.Fragment>
    )
  }
}

export default Home
