import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar bg-body-tertiary Header">
      <div className="container-fluid">
        {
          /*
          <img className='Header-Logo' src={require('../assets/logo.png')} alt="Logo" />
          */
        }
        <h3 className='Header-Logo'>Melih Makine</h3>
        <a className="navbar-brand" href="#">Makine Üretim Sektörü Örnek Uygulama</a>
      </div>
    </nav>
  )
}

export default Header