import React from 'react'
import PropTypes from 'prop-types'

class AboutUsModal extends React.Component {
  getClassName = () => {
    let className = 'modal display-none'
    if (this.props.show === true) {
      className = 'modal display-block'
    }
    return className
  }

  render () {
    const aboutUsText = `Due to the closure of many public libraries,
      many have lost the community space once afforded to them.
      Book Me Up is a chance for communities to create their own
      public libraries, uploading books that have already been read
      for others to enjoy. So upload a book, and enjoy the feeling of
      discovering a new read from someone in your own community.`

    return (
      <div>
        <h1>Welcome to Book Me Up!</h1>
        <button id="aboutUsButton" className="btn btn-lg m-2">About Book Me Up!</button>
        <div id="howToModal" className={this.getClassName()}>
          <div className="modal-content">
            <span id="closeHowTo" className="close">&times;</span>
            <p>{aboutUsText}</p>
            <p> <a style={{ 'fontWeight': 'bold' }} href="https://github.com/argy-bargy" target='_blank' rel='noreferrer'>Team Argy-Bargy</a> </p>
            <p> <a href="https://github.com/AmanTank187" target='_blank' rel='noreferrer'>Aman Tank</a> </p>
            <p> <a href="https://github.com/calavell" target='_blank' rel='noreferrer'>Cathal Lavelle</a> </p>
            <p> <a href="https://github.com/chriswhitehouse" target='_blank' rel='noreferrer'>Chris Whitehouse</a> </p>
            <p> <a href="https://github.com/kikidawson" target='_blank' rel='noreferrer'>Kiki Dawson</a> </p>
            <p> <a href="https://github.com/natashamcintyre" target='_blank' rel='noreferrer'>Natasha McIntyre</a> </p>
            <p> <a href="https://github.com/WillDixon93" target='_blank' rel='noreferrer'>Will Dixon</a> </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUsModal
