import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import editicon from "../../resources/images/pencil.png";
import regediticon from "../../resources/images/edit.png";
import wrenchicon from "../../resources/images/wrench.png";
import deleteicon from "../../resources/images/trash.png";
import eyeicon from "../../resources/images/open-eye.png";
import { datax } from "../data";


export function AutoFamilyTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (ID, Nome, Cognome, Indirizzo)";
  const filter = (item, value) => (
    ('' + item['IDFAM']).includes(value) //Devo renderlo come stringa altrimenti le funzioni stringa non funzionano
    || item['NDic'].toLowerCase().includes(value)
    || item['CDic'].toLowerCase().includes(value)
    || (!item['Indirizzo'] ? false : item['Indirizzo'].toLowerCase().includes(value)));
  const heads = {
    'IDFAM': '#',
    'NDic': 'Nome',
    'CDic': 'Cognome',
    'CodiceF': 'Codice Fiscale',
    'Indirizzo': 'Indirizzo',
    'Telefono': 'Telefono'
  };
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    heads={heads}
    handleParam={'IDFAM'}
    datafilter={filter} />;
}

export function AutoDichTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (ID, Nome, Codice Fiscale)";
  const filter = (item, value) => (
    ('' + item['IDFAM']).includes(value)
    || item['Dichiarante'].toLowerCase().includes(value)
    || ('' + item['CodiceF']).toLowerCase().includes(value));
  const heads = {
    'IDFAM': '#',
    'Dichiarante': 'Dichiarante',
    'CodiceF': 'Codice Fiscale'
  };
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    heads={heads}
    handleParam={'IDFAM'}
    datafilter={filter} />;
}

export function AutoFamFullTable(query, handleDelete, handleEdit) {
  const filter = (item, value) => (
    ('' + item['Parentela']).includes(value)
    || item['Nome'].toLowerCase().includes(value));
  const heads = {
    'Parentela': '#',
    'Nome': 'Dichiarante',
    'Cognome': 'Cognome',
    'Nascita': 'Data di nascita'
  };
  return <AutoSearchTable
    query={query}
    heads={heads}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    handleParam={'ID'}
    datafilter={filter} />;
}

export function AutoMagazzinoTable(handleShow, handleEdit, handleDelete, handleEditQuantity, handleRegEntry, query) {
  const searchText = "Esegui ricerca: (Nome prodotto)";
  const filter = (item, value) => (
    (item['Nome']).toLocaleLowerCase().includes(value));
  const heads = {
    'Nome': 'Nome Prodotto',
    'Totale': 'Quantità Magazzino'
  };
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    handleExtra={[{ onClick: (e, row) => handleEditQuantity(e, row), icon: wrenchicon, alt: "Modifica" },
    { onClick: (e, row) => handleRegEntry(e, row), icon: regediticon, alt: "Registra entrata" }]}

    heads={heads}
    handleParam={'IDProdotto'}
    datafilter={filter} />;
}

export function AutoProdottiTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (Nome prodotto, Igiene, Fresco, Extra, A magazzino)";
  const filter = (item, value) => (
    (item['Nome']).toLocaleLowerCase().includes(value)
    || (('' + value).toLowerCase() === 'extra' ? item['IsExtra'] === '1' : false)
    || (('' + value).toLowerCase() === 'igiene' ? item['IsIgiene'] === '1' : false));

  const heads = {
    'Nome': 'Nome Prodotto',
    'IsMagazzino': 'A Magazzino',
    'IsIgiene': 'Igiene',
    'IsFresco': 'Fresco',
    'IsExtra': 'Extra'
  };
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    dataFormatter={(column, data) => {
      if (column === "IsMagazzino" || column === "IsIgiene"
        || column === "IsExtra" || column === "IsFresco") {
        return data === '0' ? "No" : "Sì";
      }
      return data;
    }}
    heads={heads}
    handleParam={'ID'}
    datafilter={filter} />;
}

export function AutoEntrateTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (Nome prodotto, Nome Donatore)";
  const filter = (item, value) => (
    (item['Prodotto']).toLocaleLowerCase().includes(value)
    || (item['Donatore']).toLocaleLowerCase().includes(value));

  const heads = {
    'Prodotto': 'Nome Prodotto',
    'Donatore': 'Donatore',
    'Totale': 'Quantità',
    'Arrivo': 'Data Entrata'
  };
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    heads={heads}
    handleParam={'ID'}
    datafilter={filter} />;
}

export class AutoSearchTable extends Component {
  state = {
    modal: <></>,
    options: true,
    search_form: <></>,
    query: []
  }

  constructor(props) {
    super(props);
    this.state.options = (this.props.handleShow || this.props.handleEdit || this.props.handleDelete);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        query: this.props.query,
      });
    }
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({
        search_form: <Form bg="dark" variant="dark" sticky="top">
          <Form.Group className="mb-3" controlId="searchGroupFamily">
            <Form.Label className="lead">{this.props.searchText}</Form.Label>
            <Form.Control autoComplete="off" autoCorrect="off" type="search" onChange={this.handleSearch} />
          </Form.Group>
        </Form>
      });
    }
  }

  componentDidMount() {
    if (!!this.props.searchText) {
      this.setState({
        search_form: <Form bg="dark" variant="dark" sticky="top">
          <Form.Group className="mb-3" controlId="searchGroupFamily">
            <Form.Label className="lead">{this.props.searchText}</Form.Label>
            <Form.Control autoComplete="off" autoCorrect="off" type="search" onChange={this.handleSearch} />
          </Form.Group>
        </Form>
        , query: this.props.query
      });
    } else {
      this.setState({
        query: this.props.query
      });
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    const arr = this.props.query.filter((item) => this.props.datafilter(item, e.target.value));
    this.setState({ query: arr });
  }

  dataFormatter = (column, data, data_row) => {
    if (!!this.props.dataFormatter) {
      return this.props.dataFormatter(column, data, data_row);
    }
    return data;
  }

  popover_gen = (index, row) => {
    this.setState({
      show: true,
      modal:
        <>
          <Modal centered size="sm" show={this.state.show} onHide={() => this.setState({ show: false, modal: <></> })}>
            <Modal.Header closeButton>Opzioni:</Modal.Header>
            <Modal.Body>
              <Container fluid>
                {
                  this.props.handleExtra ?
                    Object.values(this.props.handleExtra).map((element) => {
                      return <Button key={"extra" + index + element.icon} className="center-text" variant="transparent" onClick={(e) => element.onClick(e, row)}><img src={element.icon} alt={element.alt} style={{ width: 16, height: 16 }}></img></Button>
                    })
                    : <></>
                }
                {this.props.handleShow ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleShow(e, row[this.props.handleParam])}><img src={eyeicon} alt="Mostra" style={{ width: 16, height: 16 }}></img></Button> : <></>}
                {this.props.handleEdit ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleEdit(e, row[this.props.handleParam])}><img src={editicon} alt="Modifica" style={{ width: 16, height: 16 }}></img></Button> : <></>}
                {this.props.handleDelete ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleDelete(e, row[this.props.handleParam])}><img src={deleteicon} alt="Elimina" style={{ width: 16, height: 16 }}></img></Button> : <></>}
              </Container>
            </Modal.Body>
          </Modal>
        </>
    });
  }


  render() {
    return <Container>
      {this.state.search_form}
      <div style={{ height: '60vh', overflowY: 'auto' }} className="rounded shadow" mx="auto">
        <Table className="text-center" bgcolor="white" striped responsive mx="auto" hover>
          <thead className="border">
            <tr>
              {Object.keys(this.props.heads).map((cl_id) => {
                return <th key={cl_id}>{this.props.heads[cl_id]}</th>
              })}
              {this.state.options && !datax.DataHandler.dataSettings.light ?
                <th>Opzioni</th>
                : <></>}
            </tr>
          </thead>
          <tbody className="border">
            {!datax.DataHandler.dataSettings.light ?
              this.state.query.map((row, index) => {
                return <tr key={index}>
                  {Object.keys(this.props.heads).map((cl_id) => {
                    const tData = row[cl_id] ? row[cl_id] : "——";
                    return <td key={index + "" + cl_id + "" + row[cl_id]} className="justify-content-end">{this.dataFormatter(cl_id, tData, row)}</td>
                  })}
                  {this.state.options ?
                    <td key={index}>
                      {
                        this.props.handleExtra ?
                          Object.values(this.props.handleExtra).map((element) => {
                            return <Button key={"extra" + index + element.icon} className="center-text" variant="transparent" onClick={(e) => element.onClick(e, row)}><img src={element.icon} alt={element.alt} style={{ width: 16, height: 16 }}></img></Button>
                          })
                          : <></>
                      }
                      {this.props.handleShow ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleShow(e, row[this.props.handleParam])}><img src={eyeicon} alt="Mostra" style={{ width: 16, height: 16 }}></img></Button> : <></>}
                      {this.props.handleEdit ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleEdit(e, row[this.props.handleParam])}><img src={editicon} alt="Modifica" style={{ width: 16, height: 16 }}></img></Button> : <></>}
                      {this.props.handleDelete ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleDelete(e, row[this.props.handleParam])}><img src={deleteicon} alt="Elimina" style={{ width: 16, height: 16 }}></img></Button> : <></>}
                    </td>
                    : <></>}
                </tr>;
              })
              :
              this.state.query.map((row, index) => {
                return <tr key={index} onClick={(e) => { this.popover_gen(index, row) }}>
                  {Object.keys(this.props.heads).map((cl_id) => {
                    const tData = row[cl_id] ? row[cl_id] : "——";
                    return <td key={index + "" + cl_id + "" + row[cl_id]} className="justify-content-end">{this.dataFormatter(cl_id, tData, row)}</td>
                  })}
                </tr>;
              })
            }
          </tbody>
        </Table>
      </div>
      {this.state.modal}
    </Container >
  }
}