import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import FastfootIcon from '@material-ui/icons/FastfoodOutlined'

const SideBar = props => (
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>Coffee Management</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <SubMenu title="Home" icon={faHome} items={submenus[0]}/>
          <NavItem>
            <NavLink tag={Link} to={'/order'}>
            <FastfootIcon />Order
            </NavLink>
          </NavItem>
          <SubMenu title="Pages" icon={faCopy} items={submenus[1]}/>
          <NavItem>
            <NavLink tag={Link} to={'/pages'}>
              <FontAwesomeIcon icon={faImage} className="mr-2"/>Portfolio
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/faq'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>FAQ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/contact'}>
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/>Contact
            </NavLink>
          </NavItem>
        </Nav>        
      </div>
    </div>
  );

  const submenus = [
    [
      {
        title: "Home 1",
        target: "Home-1"
      },
      {
        title: "Home 2",
        target: "Home-2",        
      },
      {
        itle: "Home 3",
        target: "Home-3",      
      }
    ],
    [
      {
        title: "Page 1",
        target: "Page-1",          
      },
      {
        title: "Page 2",
        target: "Page-2",        
      }
    ]
  ]
  

export default SideBar;
