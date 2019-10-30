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
            condition: [],
            option: { equal: 'é', different: 'não é', bigger: 'maior que', smaller: 'menor que' },
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            answer: { title: '', description: '' },
            select: { fieldNameSelected: '', optionSelected: '', answerSelected: '' }
        }
        this.updateStateFieldName = this.updateStateFieldName.bind(this)
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
    }

    updateStateFieldName = (event) => {
        this.setState({
            select: this.state.select,
                [event.target.name]: event.target.value
            
        })
        console.log(this.state)
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
            .then(data => this.setState({ field: data }))
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
                    <div className="divTitle">
                        <label>Título da View</label>
                        <input className="viewTitle" />
                    </div>
                    <div className="conditionsView">
                        <label>Condições</label>
                        <form className="itensView">
                            <select className="item" name={this.state.select.fieldNameSelected} options={this.state.select.fieldNameSelected} 
                                onChange={this.updateStateFieldName}>
                                {
                                    this.state.field.map((field) => {
                                        if (field.visible == true) {
                                            return (
                                                <option value={field.fieldName}>{field.fieldName}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                            <select className="item">
                                {
                                    this.state.field.map((field) => {
                                        return (
                                            <option value={field.fieldType === "text" ? 'caiu aqui' : 'caiu aqui 2'}>{field.fieldType === "text" ? 'caiu aqui' : 'caiu aqui 2'}</option>
                                        )
                                    }
                                    )
                                }
                            </select>
                            <select className="item">
                                <option value="" disabled selected>Novo</option>
                            </select>
                        </form>

                        {this.createCondition()}
                        <div className="divAdd">
                            <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                            <button className="save">Salvar</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}