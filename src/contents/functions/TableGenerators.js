import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import editicon from "../../resources/images/pencil.png";
import regediticon from "../../resources/images/edit.png";
import wrenchicon from "../../resources/images/wrench.png";
import deleteicon from "../../resources/images/trash.png";
import eyeicon from "../../resources/images/open-eye.png";
import { datax } from "../data";
import LoadApp from "../../components/loadApp";
import generateModal from "./ModalGenerators";
import { _ElementsIcon } from "../images";


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
    (item['Nome']).toLowerCase().includes(value));
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
    handleExtra={[{ onClick: (e, row) => handleEditQuantity(e, row), icon: wrenchicon, alt: "Modifica quantità" },
    { onClick: (e, row) => handleRegEntry(e, row), icon: regediticon, alt: "Registra entrata" }]}

    heads={heads}
    handleParam={'IDProdotto'}
    datafilter={filter} />;
}

export function AutoProdottiTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (Nome prodotto, Igiene, Fresco, Extra, A magazzino)";
  const filter = (item, value) => (
    (item['Nome']).toLowerCase().includes(value)
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
    (item['Prodotto']).toLowerCase().includes(value)
    || (item['Donatore']).toLowerCase().includes(value));

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

export function AutoModificheTable(handleShow, handleEdit, handleDelete, query) {
  const searchText = "Esegui ricerca: (Nome prodotto, Nome Motivo)";
  const filter = (item, value) => (
    (item['Prodotto']).toLowerCase().includes(value)
    || (item['Motivo']).toLowerCase().includes(value));

  const heads = {
    'Prodotto': 'Nome Prodotto',
    'Totale': 'Quantità',
    'IsSottrai': 'Modifica',
    'Motivo': 'Motivo',
    'Data': 'Data'
  };

  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    dataFormatter={(column, data, row) => {
      if (column === "IsSottrai") {
        return row[column] ? "Sottratto" : "Aggiunto";
      }
      return data;
    }}
    heads={heads}
    handleParam={'ID'}
    datafilter={filter} />;
}

export function AutoBorseTable(handleShow, handleEdit, handleDelete, handleElements, query) {
  const searchText = "Esegui ricerca: (ID e Nome Famiglia, Data)";
  const filter = (item, value) => (
    ('' + item['IDFAM']).toLowerCase().includes(value)
    || (item['Famiglia']).toLowerCase().includes(value)
    || (item['DataConsegna']).toLowerCase().includes(value));

  let heads = {};

  if (datax.DataHandler.dataSettings.light) {
    heads = {
      'IDFAM': 'ID Fam.',
      'DataConsegna': 'Data di Consegna',
      'Note': 'Note',
    };
  } else {
    heads = {
      'IDFAM': 'ID Fam.',
      'Famiglia': 'Famiglia',
      'DataConsegna': 'Data di Consegna',
      'Note': 'Note',
      'Consegnata': 'Consegnata',
      'NumeroElementi': 'n° Elementi'
    };
  }
  return <AutoSearchTable
    query={query}
    searchText={searchText}
    handleShow={handleShow}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    handleExtra={[{ onClick: (e, row) => handleElements(e, row), icon: _ElementsIcon, alt: "Lista elementi" }]}
    dataFormatter={(column, data, row) => {
      if (column === "Consegnata") {
        return row[column] ? "Sì" : "No";
      }
      return data;
    }}
    heads={heads}
    handleParam={'ID'}
    datafilter={filter} />;
}

export function AutoUtentiTable(query){
  
  const heads = {
    'email': 'E-Mail',
    'username': 'Utente'
  };

  return <AutoSearchTable
    query={query}
    heads={heads}
    handleParam={'email'} />;
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
    this.state.query = props.query;
    this.state.options = (props.handleShow || props.handleEdit || props.handleDelete);
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
    const popover = generateModal(
      -100, "Opzioni", null, null, () => {
        return <Container fluid>
          {
            this.props.handleExtra ?
              Object.values(this.props.handleExtra).map((element) => {
                return <Button key={"extra" + index + element.icon} className="center-text" variant="transparent"
                  onClick={(e) => element.onClick(e, row)}><img src={element.icon} alt={element.alt}
                    style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title={element.alt}></img></Button>
              })
              : <></>
          }
          {this.props.handleShow ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleShow(e, row[this.props.handleParam])}><img src={eyeicon} alt="Mostra" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Mostra"></img></Button> : <></>}
          {this.props.handleEdit ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleEdit(e, row[this.props.handleParam])}><img src={editicon} alt="Modifica" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Modifica"></img></Button> : <></>}
          {this.props.handleDelete ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleDelete(e, row[this.props.handleParam])}><img src={deleteicon} alt="Elimina" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Elimina"></img></Button> : <></>}
        </Container>;
      }, () => { return <></> }, () => { return <></> }, 'sm'
    );
    LoadApp.addModal(popover);
  }

  render() {
    return <Container fluid>
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
                            return <Button key={"extra" + index + element.icon} className="center-text" variant="transparent" onClick={(e) => element.onClick(e, row)}><img src={element.icon} alt={element.alt} style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title={element.alt}></img></Button>
                          })
                          : <></>
                      }
                      {this.props.handleShow ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleShow(e, row[this.props.handleParam])}><img src={eyeicon} alt="Mostra" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Mostra"></img></Button> : <></>}
                      {this.props.handleEdit ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleEdit(e, row[this.props.handleParam])}><img src={editicon} alt="Modifica" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Modifica"></img></Button> : <></>}
                      {this.props.handleDelete ? <Button className="center-text" variant="transparent" onClick={(e) => this.props.handleDelete(e, row[this.props.handleParam])}><img src={deleteicon} alt="Elimina" style={{ width: 16, height: 16 }} data-bs-toggle="tooltip" title="Elimina"></img></Button> : <></>}
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