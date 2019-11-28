import React, { Component } from 'react';
import "../../Assets/css/notFound.css";


class notFound extends Component {
    render() {
        return (
            <div className="notfound-container">
                <h1>404</h1>
                <p>Oops! Algo deu errado.</p>
                <a class="button-backhome" href="http://localhost:3000/editingfields"><i class="icon-home"></i> Volte para a página inicial, é melhor.</a>
            </div>
        )
    }
}

export default notFound;