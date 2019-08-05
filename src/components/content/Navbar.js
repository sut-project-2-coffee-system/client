import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button } from 'reactstrap';

export default props => {
  
  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <Button outline color="danger" onClick={props.toggle}>
        <FontAwesomeIcon icon={faAlignLeft}/>
      </Button>
      {/* <NavbarToggler onClick={toggle} /> */}
      <div className="ml-auto" >
              <Button outline color="danger" >Login</Button>{' '}
      </div>
    </Navbar>
  );
}
