import './ContactFormStyles.css';
import React from 'react';
import axios from 'axios';

class ContactForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    axios({
      method: 'POST',
      url: 'http://localhost:8080/send-email',
      data: {
        firstName,
        lastName,
        email,
        message
      }
    }).then(response => {
      if (response.data.msg === 'success') {
        alert('Message Sent!');
        this.resetForm();
      } else if (response.data.msg === 'fail') {
        alert('Message failed to send.');
      }
    });
  };

  resetForm = () => {
    document.querySelector('#contact-form').reset();
  };

  render() {
    return (
      <div className="ui container">
        <h1 className="ui huge header">Contact Me!</h1>
        <div id="error-message"></div>
        <form
          action="/send-email"
          method="POST"
          id="contact-form"
          className="ui form"
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="field">
            <label>Text</label>
            <textarea id="message" name="message"></textarea>
          </div>

          <button className="ui button green" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
