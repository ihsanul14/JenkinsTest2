import React, {Component} from 'react';

class Footer extends Component {
  
  render() {
    var th = new Date()
    var year = th.getFullYear()

    return (
      <footer className="app-footer">
        <span><a href="http://bri.co.id">PT. Bank Rakyat Indonesia, Tbk</a> &copy; {year} Big Data Analytics.</span>
        <span className="ml-auto">Powered by <a href="http://bri.co.id">PT. Bank Rakyat Indonesia, Tbk</a></span>
      </footer>
    )
  }
}

export default Footer;
