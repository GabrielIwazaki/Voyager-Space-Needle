import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'



export default class editingFields extends Component {

    render() {
        const root = this;
        return (
            <div className="all">
                <Header />
                <Menu />
                <div className="formView">
                    <div className="divtitulo">
                        <label>Título da View</label>
                        <input className="tituloView"/>
                    </div>
                    <div className="condicoesView">
                        <label>Condições</label>
                        <div className="itensView">
                            <select className="item">
                            <option value="" disabled selected>Status</option>
                            </select>
                            <select className="item">
                            <option value="" disabled selected>É</option>
                            </select>
                            <select className="item">
                            <option value="" disabled selected>Novo</option>
                            </select>
                        </div>
                        <div className="divadd">
                            <button className="add">Adicionar</button>
                            <button className="save">Salvar</button>
                        </div>
                    </div>
                </div>
                <div className="listView">

                </div>
            </div>
        )
    }
}