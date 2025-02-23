import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import X2JS from 'x2js';

export default class Txt_page extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
   
    const { page } = this.props.match.params || 'home';
	
    const page_x = app.settings.ws_conf.pgs[page];

    if (!page || !page_x) return null;

    return (
      <section id="Txt_page">
        <div id="page-container">
          <h1>{page_x.pg_name}</h1>

          <div dangerouslySetInnerHTML={{ __html: page_x.txt.__cdata }} />

          <div className="btns">
            {(new X2JS()).asArray(page_x.btns.b).map((b, i) => (
              <Link to={b.u} key={i}>
                <button type="submit" className="button">
                  <span>
                    {b.txt} <span className="fa fa-caret-right"></span>
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
}