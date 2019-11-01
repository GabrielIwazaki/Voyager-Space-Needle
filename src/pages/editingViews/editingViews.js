import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'

export default class editingFields extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            titleView: '',
            condition: [],
            column: [{ id: '', fieldName: '' }],
            field: [
                { id: '', fieldName: '', fieldType: '', visible: true, required: false, values: [] }
            ],
            answer: { title: '', description: '' },
        }

        this.updateStateTitleView = this.updateStateTitleView.bind(this);
        this.updateColumn = this.updateColumn.bind(this);
    }

    updateStateTitleView(event) {
        this.setState({ titleView: event.target.value })
    }

    updateColumn(event) {
        console.log({ fieldName: event.target })
        this.setState({ fieldName: event.target.checked })
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
    }

    createCondition() {
        return this.state.condition.map((el, i) =>
            <div className="general">
                <div key={i} className="itensView-extra">
                    <select className="itemExtra">
                        {
                            this.state.field.map((field) => {
                                return (
                                    <option value="">{field.fieldName}</option>
                                )
                            })
                        }
                    </select>
                    <select className="itemExtra">
                        <option value="" disabled selected>É</option>
                    </select>
                    <select className="itemExtra">
                        <option value="" disabled selected>Novo</option>
                    </select>
                </div>
                <div type='button' className="remove-value" value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )
    }

    searchFields() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ field: data })
                console.log(this.state)
            })
            .catch(error => console.log(error))
    }

    searchAnswers() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ answer: data }))
            .catch(error => console.log(error))
    }

    registerView(event) {
        event.preventDefault();
        fetch('http://5d8289a9c9e3410014070b11.mockapi.io/view', {
            method: 'POST',
            body: JSON.stringify({
                titleView: this.state.titleView,
                column: this.state.column
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .catch(error => console.log(error))
    }

    addClick() {
        this.setState(prevState => ({ condition: [...prevState.condition, ''] }))
    }
    removeClick(i) {
        let condition = [...this.state.condition];
        condition.splice(i, 1);
        this.setState({ condition });
    }

    render() {
        const root = this;
        return (
            <div className="all">
                <Header />
                <Menu />
                <div className="formView">
                    <form onSubmit={this.registerView.bind(this)}>

                        <div className="divTitle">
                            <label>Título da View</label>
                            <input className="viewTitle" type="text" value={this.state.titleView} onChange={this.updateStateTitleView} />
                        </div>
                        <div className="conditionsView">
                            <label className="conditionsTitle">Condições</label>
                            <div className="itensView">
                                <select className="item">
                                    {
                                        this.state.field.map((field) => {
                                            if (field.visible === true) {
                                                return (
                                                    <option value={field.fieldName}> {field.visible} {field.fieldName}</option>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </select>
                                <select className="item">
                                    <option value="" disabled selected>É</option>
                                </select>
                                <select className="item">
                                    <option value="" disabled selected>Novo</option>
                                </select>
                            </div>
                            {this.createCondition()}
                            <div className="divAdd">
                                <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                            </div>
                        </div>
                        <div className="columns">
                            <label className="title">Colunas da Tabela</label>
                            <div className="allCheckbox">
                                {
                                    this.state.field.map((field) => {
                                        if (field.visible == true) {
                                            return (
                                                <ul class="ks-cboxtags">
                                                    <li>
                                                        {/* <input type="checkbox" id="checkboxOne" value={field.fieldName} onChange={this.updateColumn} /><label for="checkboxOne">{field.fieldName}</label> */}
                                                        <label for="checkboxOne">
                                                        
                                                        <input type="checkbox" className="checkboxOne" value={field.fieldName} onChange={this.updateColumn.bind(this)} />
                                                        
                                                        {field.fieldName}
                                                        
                                                        </label>
                                                    </li>
                                                </ul>
                                                // <div>
                                                // {/* <div className="columnDiv">
                                                //     <div className="closeImg"></div>
                                                //     <label className="columnLabel">
                                                //         <input className="columnCheckbox" type="checkbox" value={field.fieldName} onChange={this.updateStateCampoColumn} /> {field.fieldName}
                                                //     </label>
                                                // </div> */}
                                                // </div>

                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>

                        <div className="orderGeral">
                            <label>Ordenação</label>
                            <div className="order">
                                <select className="item">
                                    {
                                        this.state.field.map((field) => {
                                            if (field.visible === true) {
                                                return (
                                                    <option value={field.fieldName}> {field.visible} {field.fieldName}</option>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </select>
                                <select className="item">
                                    <option value="" disabled selected>A-Z</option>
                                </select>
                            </div>
                        </div>

                        <button className="save" type="submit">Salvar</button>
                    </form>
                </div>

            </div>
        )
    }
}