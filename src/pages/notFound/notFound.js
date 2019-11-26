import React, { Component } from 'react';
import "../../Assets/css/notfound.css";

class notFound extends Component {
    render() {
        return (
            <div className="notfound-container">
                <div className="error">
                    <div className="wrap">
                        <div className="404">
                            <pre>
                                <code>
                                    <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span>
                                    <span className="orange">&lt;html&gt;</span>
                                    <span className="orange">&lt;style&gt;</span>
                                    <span className="green">everything</span>: <span className="blue">awesome</span>
                                    <span className="orange">&lt;/style&gt;</span>
                                    <span className="orange">&lt;body&gt;</span>
                                    ERROR 404!
                                    FILE NOT FOUND!
				                    <span className="comment">&lt;!--The file you are looking for,
                                    is not where you think it is.--&gt;</span>
                                    <span className="orange"></span>
                                    <br />
                                </code>
                            </pre>
                        </div>
                    </div>
                    <span className="info">
                        <br />
                        <span className="orange">&nbsp;&lt;/body&gt;</span>
                        <br />
                        <span className="orange">&lt;/html&gt;</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default notFound;