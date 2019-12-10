import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class editingFields extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
      conditions: [],
      answers: [],
      answerFilters: [],
      order: '',
      columns: [],
      views: []
    }
  }



  componentDidMount() {
    this.searchFields();
    this.searchAnswers();
    this.searchViews();
  }

  searchFields() {
    fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ fields: data }))
      .catch(error => console.log(error))
  }

  searchAnswers() {
    fetch('https://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ answers: data }))
      .catch(error => console.log(error))
  }

  searchViews() {
    fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ views: data }))
      .catch(error => console.log(error))
  }


  onChangeFieldName(event) {
    const listFields = [];
    let index = event.target.getAttribute('data-count');
    if (this.state.conditions[index] !== undefined) {
      this.state.conditions[index].field = event.target.value;
    } else {
      this.state.condition.push({
        field: event.target.value,
        conditional: '',
        answer: ''
      })
    }

    this.state.answers.map((answer) => {
      const fields = Object.keys(answer.answer)
      fields.map((field) => {
        if (field === event.target.value) {
          listFields.push(answer.answer[field]);
        }
      })
    })

    const uniqueAnswers = [...new Set(listFields.map(item => item))];
    this.setState({ answerFilters: uniqueAnswers });
  }

  onChangeConditionnal(event) {
    console.log(event.target.value);
    if (
      this.state.conditions[event.target.getAttribute("data-count")] !==
      undefined
    ) {
      this.state.conditions[
        event.target.getAttribute("data-count")
      ].conditional = event.target.value;
    } else {
      this.state.conditions.push({
        field: "",
        conditional: event.target.value,
        answer: ""
      });
    }
  }

  onChangeAnswer(event) {
    let index = event.target.getAttribute('data-count');
    if (this.state.conditions[index] !== undefined) {
      this.state.conditions[index].answer = event.target.value;
    } else {
      this.state.conditions.push({
        field: '',
        conditional: '',
        answer: event.target.value
      })
    }
  }

  onChangeOrder(event) {
    this.setState({ order: event.target.value });
  }

  updateColumn(event) {

    const field = this.state.fields.filter(element => element.fieldName === event.target.value);
    const columns = this.state.columns;
    if (columns.indexOf(event.target.value) === -1) {
      columns.push(field[0].fieldName);
    } else {
      columns.splice(columns.indexOf(event.target.value), 1);
    }

    this.setState({ column: columns })
  }

  addCondition() {
    console.log('add');
    this.state.conditions.push({
      field: "",
      conditional: "",
      answer: ""
    })
    this.setState({ conditions: this.state.conditions })
  }

  removeCondition(event, index) {
    this.state.conditions.splice(index, 1);

    this.setState({ conditions: this.state.conditions })
  }

  clearForm() {
    this.setState({
      id: '',
      title: '',
      conditions: [],
      columns: [],
      order: []
    })
  }

  editView(event) {

    let viewId = event.target.getAttribute('data-id');
    console.log(viewId);

    let view = this.state.views[viewId];
    this.setState({
      id: view.id,
      title: view.title,
      conditions: view.conditions,
      columns: view.columns,
      order: view.order
    });
  }

  deleteView(event) {
    event.preventDefault();
    fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view/' + event.target.getAttribute('id'), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.searchViews())
      .then(response => response)
  }

  listAnswers(index) {
    let listFields = [];
    let view = this.state.conditions[index];

    this.state.answers.map(answer => {
      const fields = Object.keys(answer.answer);
      fields.map(field => {
        if (field === view.field) {
          listFields.push(answer.answer[field]);
        }
      });
    });

    const uniqueAnswers = [...new Set(listFields.map(item => item))];
    return uniqueAnswers;
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      title: this.state.title,
      conditions: this.state.conditions,
      columns: this.state.columns,
      order: this.state.order
    };

    let url = "https://5d8289a9c9e3410014070b11.mockapi.io/view/";
    let method = "POST";

    if (this.state.id !== "") {
      data.id = this.state.id;
      url += this.state.id;
      method = "Put";
    }

    console.log(JSON.stringify(data));

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response)
      .then(() => {
        this.setState({ id: "" });
        this.searchViews();
        this.clearForm();
      });
  }


  resetForm = () => {
    this.setState({
      id: '',
      title: '',
      conditions: [],
      columns: [],
      order: []
    })
  }

  render() {
    return (
      <div className="all">
        <Header />
        <Menu />
        <div className="container">
          <h2>Edit Views</h2>
          <div className="formView">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="divTitle">
                <label htmlFor="exampleInputEmail1">Título</label>
                <input
                  type="titulo"
                  className="viewTitle"
                  id="inputTitulo"
                  aria-describedby="tituloHelp"
                  placeholder="Title View"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>
              <div>
                <table className="conditionsView">
                  {/* <div className="itensView-title"> */}
                  <thead>
                    <tr>
                      <th className="conditionsTitle">Condições</th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>
                  {/* </div> */}
                  {/* <div className="itensView-container"> */}
                    <tbody>
                      {this.state.conditions.map((item, index) => {
                        return (
                          // <div className="itensView">
                          <tr className="itensView-tr" key={index}>
                            <td>
                              <select
                                className="item"
                                name={"field"}
                                defaultValue={item.field}
                                data-count={index}
                                onChange={this.onChangeFieldName.bind(this)}
                              >
                                <option value="">Selecione</option>
                                {this.state.fields.map((field, index) => {
                                  return (
                                    <option key={index} value={field.fieldName}>
                                      {field.fieldName}
                                    </option>
                                  );
                                })}
                                ) }
                            </select>
                            </td>
                            <td>
                              <select
                                className="item"
                                name={"condition"}
                                defaultValue={item.conditional}
                                data-count={index}
                                onChange={this.onChangeConditionnal.bind(this)}
                                disabled={
                                  this.state.conditions[index].field === ""
                                    ? "none"
                                    : ""
                                }
                              >
                                <option value="">Selecione</option>
                                <option value="É">É</option>
                                <option value="Não é">Não é</option>
                              </select>
                            </td>
                            <td>
                              <select
                                className="item"
                                name={"answer"}
                                defaultValue={item.answer}
                                data-count={index}
                                onChange={this.onChangeAnswer.bind(this)}
                                disabled={item.field === "" ? "none" : ""}
                              >
                                <option value="">Selecione</option>
                                {this.listAnswers(index).map((answer, index) => {
                                  return <option key={index}>{answer}</option>;
                                })}
                                )
                            </select>
                            </td>

                            <td>
                              <div
                                className="remove-value-condition"
                                onClick={this.removeCondition.bind(this, index)}
                                type="button"
                              >
                              </div>
                            </td>
                          </tr>
                          // </div>

                        );
                      })}
                      <th style={{ textAlign: "right" }}>
                      </th>
                    </tbody>
                  {/* </div>; */}
                  <div className="button-div">
                    <button
                      className="add"
                      onClick={this.addCondition.bind(this)}
                      type="button"
                    >
                      Adicionar
                        </button>
                  </div>
                </table>
              </div>
              <div className="columns">
                <label className="title">Colunas da Tabela</label>
                <div className="allCheckbox">
                  <ul className="ks-cboxtags">
                    {this.state.fields.map((field, index) => {
                      if (field.visible === true) {
                        return (
                          <li key={index}>
                            {this.state.columns.indexOf(field.fieldName) !== -1 ? (
                              <input
                                id={`checkbox${index}`}
                                type="checkbox"
                                className="checkboxOne"
                                value={field.fieldName}
                                onClick={this.updateColumn.bind(this)}
                                defaultChecked
                              />
                            ) : (
                                <div>
                                  <input
                                    id={`checkbox${index}`}
                                    type="checkbox"
                                    className="checkboxOne"
                                    value={field.fieldName}
                                    onClick={this.updateColumn.bind(this)}
                                  />
                                </div>
                              )}

                            <label htmlFor={`checkbox${index}`}>
                              <div className="checkImg"></div>
                              {field.fieldName}
                            </label>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>

              <div className="orderGeral">
                <div className="orderGeral-title">
                  <label htmlFor="">Order</label>
                </div>
                <div className="order-select">
                  <select
                    className="item"
                    onChange={this.onChangeOrder.bind(this)}
                    defaultValue={this.state.order}
                  >
                    <option value="">Selecione</option>
                    {this.state.fields.map((field, index) => {
                      if (field.visible === true) {
                        return (
                          <option
                            key={index}
                            defaultValue={field.fieldName}
                            selected={
                              this.state.order === field.fieldName ? true : false
                            }
                          >
                            {" "}
                            {field.visible} {field.fieldName}
                          </option>
                        );
                      }
                    })}
                  </select>

                  <select className="item" name="valoreslista">
                    <option value="A-Z" >A-Z</option>
                    <option value="Z-A" >Z-A</option>
                  </select>
                </div>
              </div>


              <div className="clear-save-buttons">
                <button type="submit" className="save">Salvar</button>
                <button onClick={this.resetForm} type="button" className="clear-button">Limpar</button>
              </div>

            </form>
          </div>

          <div className="listView-container">
            <div className="listView">
              {
                this.state.views.map((view) => {
                  return (
                    <ul>
                      <li>
                        <div className="listView-item">
                          <div className="dropdown">
                            <div className="dropdown-content">
                              <div className="dropdown-content-container">
                                <button className="buttonEdit" id={view.id} onClick={(event) => this.editView(view, event)}>Editar</button>
                                <button className="buttonDelete" id={view.id} onClick={this.deleteView.bind(this)}>Excluir</button>
                              </div>
                            </div>
                          </div>
                          {view.title}
                        </div>
                      </li>
                    </ul>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}