import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const baseUrl = 'http://localhost:3001/users';

const initialState = {
    user: {
        name: '',
        lastName: '',
        email: ''
    },
    list: []
}

export default class App extends Component {

    state = { ...initialState }

    componentWillMount() {
        console.log('')
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        try {
            const user = this.state.user;
            const method = 'put'
            const url = `${baseUrl}/1`;
            axios[method](url, user)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data);
                    this.setState({ user: initialState.user, list });
                });
            console.log('estado atualizado com sucesso');
        } catch (error) {
            console.log('ocorreu um erro', error);
        }
    }

    getUpdatedList(user, add = true) {
        console.log('pegando lista atualizada do banco de dados');
        const list = this.state.list.filter(u => u.id !== user.id);
        if (add) list.unshift(user);

        return list;
    }

    updateField(event) {
        console.log('atualizando o estado dos inputs');
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Sobrenome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={this.state.user.lastName}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o email"
                            />
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}
                            >
                                Salvar
                            </button>

                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    load(user) {
        this.setState({ user })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Informacoes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTable()}
            </div>
        );
    }
};