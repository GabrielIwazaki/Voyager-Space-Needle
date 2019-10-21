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
                        <label>Condições</label>
                    <div className="condicoesView">
                        <div className="itensView">
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                    </div>
                </div>
                <div className="listView">

                </div>
            </div>
        )
    }
}