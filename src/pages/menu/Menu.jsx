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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
}));

const type = [
    {
        value: true,
        label: 'กาแฟ',
    },
    {
        value: false,
        label: 'อื่นๆ',
    }
];
function Menu(props) {
    const classes = useStyles();
    useEffect(() => {
        props.dispatch(loadmenu())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [value, setValue] = React.useState(0);
    const [dialogEdit, setDialogEdit] = useState(false);
    const [dialogAdd, setDialogAdd] = useState(false);
    const [curMenu, setCurMenu] = useState({});
    const [newMenu, setNewMenu] = useState({
        "name": "",
        "price": "",
        "image": "",
        "isCoffee": true,
    });
    const [uploadValue, setUploadValue] = useState(0)
    const [messag, setMessag] = useState("")


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleChangeUpload(event) {
        let file = event.target.files
        const fileUpload = file[0];
        const storageRef = firebase.storage().ref(`menuImage/${file[0].name}`);
        const task = storageRef.put(fileUpload)

        task.on(`state_changed`, (snapshort) => {
            //console.log(snapshort.bytesTransferred, snapshort.totalBytes)
            let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            //Process
            setUploadValue(percentage)
            console.log(percentage);

        }, (error) => {
            //Error
            setMessag(`Upload error : ${error.message}`)
        }, () => {
            //Success
            setMessag(`Upload Success`)
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                setNewMenu({ ...newMenu, image: downloadURL })
                setCurMenu({ ...curMenu, image: downloadURL })
            });
        })
    }

    function handleClickEdit(cur) {
        setCurMenu(cur)
        setDialogEdit(true)
    }

    function handleClickAdd() {
        setDialogAdd(true)

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
            "isCoffee": curMenu.isCoffee,
        });
        setDialogEdit(false);
    }

    function deleteCurMenu() {
        firebase.database().ref('menu/' + curMenu.key).remove();
        setDialogEdit(false);
    }

    function AddMenu() {
        firebase.database().ref('menu').push(newMenu);
        setDialogAdd(false);
        setNewMenu({
            "name": "",
            "price": "",
            "image": "",
            "isCoffee": true,
        })
    }

    const handleChangeEdit = key => event => {
        setCurMenu({ ...curMenu, [key]: event.target.value });
    };

    const handleChangeAdd = key => event => {
        setNewMenu({ ...newMenu, [key]: event.target.value });
        //console.log(newMenu);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }

    return (
        <div style={{ flexGrow: 1 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{ marginBottom: "15px" }}
            >
                <Tab label="กาแฟ" />
                <Tab label="อื่นๆ" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {props.menuList.map((cur, i) => {
                            return cur.isCoffee && (
                                <Grid item xs={3} key={i}>
                                    <MenuCard menuName={cur.name} imgUrl={cur.image} price={cur.price} onClick={() => handleClickEdit(cur)}></MenuCard>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {props.menuList.map((cur, i) => {
                            return !cur.isCoffee && (
                                <Grid item xs={3} key={i}>
                                    <MenuCard menuName={cur.name} imgUrl={cur.image} price={cur.price} onClick={() => handleClickEdit(cur)}></MenuCard>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </TabPanel>

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
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        fullWidth
                        value={curMenu.isCoffee}
                        onChange={handleChangeEdit('isCoffee')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {type.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleChangeUpload(e)}
                    />
                    {(uploadValue > 0 && uploadValue < 100) && (<span>{uploadValue}%</span>)} {uploadValue === 100 && (<span>{messag}</span>)}
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
                        value={newMenu.name}
                        onChange={handleChangeAdd('name')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuPrice"
                        label="Manu Price"
                        type="number"
                        value={newMenu.price}
                        onChange={handleChangeAdd('price')}
                        fullWidth
                    />
                    <TextField
                        name="newMenu"
                        autoFocus
                        margin="dense"
                        id="menuImage"
                        label="Manu Image"
                        type="text"
                        value={newMenu.image}
                        onChange={handleChangeAdd('image')}
                        fullWidth
                    />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        fullWidth
                        value={newMenu.isCoffee}
                        onChange={handleChangeAdd('isCoffee')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {type.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleChangeUpload(e)}
                    />
                    {(uploadValue > 0 && uploadValue < 100) && (<span>{uploadValue}%</span>)} {uploadValue === 100 && (<span>{messag}</span>)}
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
                <AddIcon onClick={handleClickAdd} />
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
