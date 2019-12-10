import React, { Component } from 'react';
import '../../Assets/css/listViews.css';
import DataTable from 'react-data-table-component';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';

export default class listViews extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            conditions: [],
            answers: [],
            answerFilters: [],
            order: { name: '', type: '' },
            columns: [],
            views: [],
            listaView: [],
            objsList: [],
            search: "",
            filteredList: []
        }
    }

    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchViews();
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
    selectView = (view) => {
        this.setState({ currentView: view })

        let result = [];
        this.state.listaView.map(element => {
            if (element.titleView === this.state.currentView) {
                element.column.map(element1 => {
                    result.push({ name: element1[0].fieldName, selector: element1[0].fieldName })
                })

            }
        })
        this.setState({ currentColumns: result })



        const listFields = [];
        this.state.answer.map((answer) => {
            const fields = Object.keys(answer.answer)
            fields.map((field) => {
                listFields.push(answer.answer[field]);

            })
        })

        const uniqueAnswers = new Set(listFields.map(item => item));
        this.setState({ answerFilters: uniqueAnswers }, () => {
            uniqueAnswers.push({ uniqueAnswers: uniqueAnswers })
        });

        this.setState({ answerFilters: uniqueAnswers })
        console.log(uniqueAnswers)
    }


    render() {
        const data = [{ title: 'Conan the Barbarian', year: '2002' }, { title: 'Abc the Barbarian', year: '1971' }, { title: 'Cba the Barbarian', year: '1983' }, { title: 'Dab the Barbarian', year: '1880' }];
        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
                right: true,
            },
        ]
        return (
            <div className="full">
                <Header />
                <Menu />
                <div className="listViews-container">
                    <div className="listView-container">
                        <div className="listView">
                            {
                                this.state.views.map((view) => {
                                    return (
                                        <ul>
                                            <li>
                                                <div className="listView-item">
                                                    {/* <div className="dropdown">
                                                        <div className="dropdown-content">
                                                            <div className="dropdown-content-container">
                                                                <button className="buttonEdit" id={view.id} onClick={(event) => this.editView(view, event)}>Editar</button>
                                                                <button className="buttonDelete" id={view.id} onClick={this.deleteView.bind(this)}>Excluir</button>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    {view.title}
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
                    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
                    {/* <table className="listaView">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.views.map((view, index) => {
                                return (
                                    <tr key={index}>
                                        <button onClick={() => this.selectView(view.titleView)}>{view.title}</button>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> */}

                    {/* <DataTable
                        // title="Arnold Movies"
                        columns={this.state.currentColumns}
                        data={this.state.answerFilters}

                    /> */}
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
};