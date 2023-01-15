import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(3),
      name: data.name,
      number: data.number,
    };
    const dataNameNormalized = newContact.name.toLowerCase();
    const anyName = contacts.some(
      ({ name }) => dataNameNormalized === name.toLowerCase()
    );
    const notifyError = () =>
      toast.error(`"${newContact.name}" is already in contacts`);
    const notifySucces = () =>
      toast.success(`"${newContact.name}" successfully added!`);

    if (anyName) {
      // console.log('Такий контакт вже є в контактах');
      notifyError();
      return;
    }
    // console.log('Додаю в контакти');
    notifySucces();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    // console.log(evt.currentTarget.value);
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;

    const filterNormalized = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  render() {
    // console.log(this.state.contacts);
    // console.log(this.state.filter);
    // const { contacts } = this.state;

    const { filter } = this.state;

    const visibleContacts = this.getVisibleContact();

    return (
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {visibleContacts.length || filter ? (
          visibleContacts.length ? (
            <>
              <Filter value={filter} onChange={this.changeFilter} />
              <ContactList
                contacts={visibleContacts}
                onDeleteContact={this.deleteContact}
              />
            </>
          ) : (
            <>
              <Filter value={filter} onChange={this.changeFilter} />
              <p>No matches found for "{filter}"</p>
            </>
          )
        ) : (
          <p>There are no phone numbers in Contacts</p>
        )}
      </Container>
    );
  }
}

/* <p>There are no phone numbers in Contacts</p>; */
