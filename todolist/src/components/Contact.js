import React from 'react';
import './Contact.css';
import PropTypes from 'prop-types';

function Contact(props) {
    return(
      <div className='contact'>
          <span>{props.name}</span>
      </div>
    );
}

Contact.propTypes = {
    name: PropTypes.string.isRequired
};

export default Contact;