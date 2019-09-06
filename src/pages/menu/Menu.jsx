import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import MenuCard from '../cashier/MenuCard'
import { Grid } from '@material-ui/core';
import { loadmenu } from '../../actions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Menu(props) {

    useEffect(() => {
        props.dispatch(loadmenu())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [dialogEdit, setDialogEdit] = useState(false);
    const [dialogAdd, setDialogAdd] = useState(false);
    const [curMenu, setCurMenu] = useState({});
    const [newMenu, setNewMenu] = useState({
        "name": "",
        "price": "",
        "image": "",
    });

    function handleClickEdit(cur) {
        setCurMenu(cur)
        setDialogEdit(true)
    }

    function handleCloseEdit() {
        setDialogEdit(false);
    }

    function handleCloseAdd() {
        setDialogAdd(false);
    }

    function editCurMenu() {
        firebase.database().ref('menu/' + curMenu.key).set({
            "name": curMenu.name,
            "price": curMenu.price,
            "image": curMenu.image,
        });
        setDialogEdit(false);
    }

    function deleteCurMenu() {
        firebase.database().ref('menu/' + curMenu.key).remove();
        setDialogEdit(false);
    }

    function AddMenu() {
        firebase.database().ref('menu').push(newMenu);
        setDialogEdit(false);
    }

    const handleChangeEdit = key => event => {
        setCurMenu({ ...curMenu, [key]: event.target.value });
    };

    const handleChangeAdd = key => event => {
        setNewMenu({ ...newMenu, [key]: event.target.value });
    };

    return (
        <div style={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    {props.menuList.map((cur, i) => {
                        return (
                            <Grid item xs={3} key={i}>
                                <MenuCard menuName={cur.name} imgUrl={cur.image} price={cur.price} onClick={() => handleClickEdit(cur)}></MenuCard>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
            <Dialog
                open={dialogEdit}
                onClose={handleCloseEdit}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Key : {curMenu.key}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Manu Name"
                        type="text"
                        onChange={handleChangeEdit('name')}
                        value={curMenu.name}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuPrice"
                        label="Manu Price"
                        type="number"
                        onChange={handleChangeEdit('price')}
                        value={curMenu.price}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuImage"
                        label="Manu Image"
                        type="text"
                        onChange={handleChangeEdit('image')}
                        value={curMenu.image}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteCurMenu} color="primary">
                        Delete
                    </Button>
                    <Button onClick={editCurMenu} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogAdd}
                onClose={handleCloseAdd}
                aria-labelledby="form-dialog-title"
            >
                {/* <DialogTitle id="form-dialog-title">Key : {curMenu.key}</DialogTitle> */}
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Manu Name"
                        type="text"
                        onChange={handleChangeAdd('name')}
                        value={newMenu.name}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuPrice"
                        label="Manu Price"
                        type="number"
                        onChange={handleChangeAdd('price')}
                        value={newMenu.price}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuImage"
                        label="Manu Image"
                        type="text"
                        onChange={handleChangeAdd('image')}
                        value={newMenu.image}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={AddMenu} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Fab aria-label='Add' style={{ position: 'fixed', bottom: 25, right: 25, }} color='primary'>
                <AddIcon onClick={() => setDialogAdd(true)} />
            </Fab>
        </div>
    );
}

function mapStatetoProps(state) {
    return {
        menuList: state.menuList,
    }
}


export default connect(mapStatetoProps)(Menu)
