import React from 'react'
import "../../Assets/css/menu.css"

function menu(){
    return (
    <div className="menu">
        <div className="sidebar-container">
            <ul className="sidebar">
                <li>
                    <a href="#">
                        <div className="account-img"></div>
                        Minha conta
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="doc-fields"></div>
                        Campos do Document
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="views-add"></div>
                        Cadastro de Views
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="doc-list"></div>
                    Lista de Documents
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="doc-details"></div>
                        Documents Details
                    </a>
                </li>
            </ul>
        </div>
    </div>
    );
}
export default menu;