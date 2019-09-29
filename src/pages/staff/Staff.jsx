import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import firebase from '../../Firebase'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';


const columns = [
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 100 },
    { id: 'money', label: 'Income', minWidth: 100 },
    { id: 'role', label: 'Page', minWidth: 200 },
]

const prefixEn = [
    {
        value: 'Miss',
        label: 'Miss',
    },
    {
        value: 'Mrs.',
        label: 'Mrs.',
    },
    {
        value: 'Mr.',
        label: 'Mr.',
    },
    {
        value: 'Master',
        label: 'Master',
    },
];

const prefixTh = [
    {
        value: 'นางสาว',
        label: 'นางสาว',
    },
    {
        value: 'นาง',
        label: 'นาง',
    },
    {
        value: 'นาย',
        label: 'นาย',
    },
    {
        value: 'เด็กหญิง',
        label: 'เด็กหญิง',
    },
    {
        value: 'เด็กชาย',
        label: 'เด็กชาย'
    },
];

const sex = [
    {
        value: 'ชาย',
        label: 'ชาย',
    },
    {
        value: 'หญิง',
        label: 'หญิง',
    }
];
const status = [
    {
        value: 'โสด',
        label: 'โสด',
    },
    {
        value: 'สมรส',
        label: 'สมรส',
    }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Cashier',
    'Order',
    'History',
    'Menu',
    'Promotion',
    'Staff'
];


const useStyles = makeStyles(theme => ({
    table: {
        width: '100%'
    },
    tableWrapper: {
        overflow: 'auto',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 15
    },
    paperDialog: {
        padding: theme.spacing(3, 2),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,
        maxWidth: 280,
    },
    paper: {
        marginTop: 10
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Staff(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([])
    const [staff, setStaff] = useState([])
    let initForm = {
        "code": "",
        "birdDate": new Date(),
        "displayName": "",
        "email": "",
        "password": "",
        "firstNameEn": "",
        "firstNameTh": "",
        "idCard": "",
        "lastNameEn": "",
        "lastNameTh": "",
        "middleNameTh": "",
        "middletNameEn": "",
        "money": "",
        "nation": "",
        "phoneNumber": "",
        "position": "",
        "prefixEn": "Mr.",
        "prefixTh": "นาย",
        "role": [],
        "sex": "ชาย",
        "status": "โสด",
        "idCardImageURL": "",
        "houseParticularsImageURL": ""
    }

    const [myform, setMyform] = React.useState(initForm);
    const [snack, setSnack] = React.useState({ open: false, message: "" });
    const [uploadValue, setUploadValue] = useState(0)
    const [messag, setMessag] = useState("")

    function handleChangeUpload(event, type) {
        let file = event.target.files
        const fileUpload = file[0];
        const storageRef = firebase.storage().ref(`verify/${file[0].name}`);
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
                //setNewMenu({...newMenu, image:downloadURL})
                //setCurMenu({...curMenu, image:downloadURL})
                if (type === "idCardImageURL")
                    setMyform({ ...myform, idCardImageURL: downloadURL })
                if (type === "houseParticularsImageURL")
                    setMyform({ ...myform, houseParticularsImageURL: downloadURL })
            });
        })
    }


    useEffect(() => {
        let isSubscribed = true
        async function db() {

            await firebase.database().ref("staff").on('value', snapshot => {

                if (isSubscribed) {
                    var val = snapshot.val();
                    setStaff(val)
                    setRows(() => {
                        let temp = []
                        for (let key in val) {
                            console.log(val[key].role);
                            temp.push(
                                {
                                    code: key,
                                    name: val[key].prefixTh + " " + val[key].firstNameTh + " " + val[key].lastNameTh,
                                    email: val[key].email,
                                    position: val[key].position,
                                    money: val[key].money,
                                    role: val[key].role === undefined ? "ไม่มีสิทธิ์เข้าถึง" : val[key].role.join()
                                }
                            )
                        }
                        return temp;
                    })
                }

            })

        }
        db()

        return () => isSubscribed = false
    }, [])

    const handleClickSnack = (msg) => {
        setSnack({ open: true, message: msg });
    };

    const handleCloseSnack = () => {
        setSnack(false);
    };

    function handleChangeRole(event) {
        setMyform({ ...myform, role: event.target.value });
    }



    const handleSubmit = (event) => {
        console.log(myform);
        let user = { uid: "xxx" };
        if (myform.code === "") {
            event.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(myform.email, myform.password).then((userCredential) => {
                user = userCredential.user;
                if (userCredential) {
                    userCredential.user.updateProfile({
                        displayName: myform.displayName,
                        phoneNumber: myform.phoneNumber
                    })
                }
            })
                .then((sendEmailVerify) => {
                    if (sendEmailVerify === false)
                        return false
                    else {
                        firebase.auth().currentUser.sendEmailVerification();
                        console.log(user);

                        handleClickSnack("กรุณายืนยัน email ที่ " + myform.email)
                        //props.history.push('/')
                        delete myform.password
                        myform.birdDate = myform.birdDate.getTime()
                        firebase.database().ref("staff").child(user.uid).set(
                            myform
                        )
                        handleClickSnack("บันทึกข้อมูลของ " + myform.prefixTh + " " + myform.firstNameTh + " " + myform.lastNameTh + " เรียบร้อยแล้ว")
                        setOpen(false);
                        return true
                    }
                })
                .catch((error) => {
                    if (error.code === 'auth/weak-password')
                        alert('The password is too weak')
                    else
                        alert(error.message)
                })


        }
        else {
            delete myform.password
            firebase.database().ref("staff/" + myform.code).set(
                myform
            )
            handleClickSnack("แก้ไขข้อมูลของ " + myform.prefixTh + " " + myform.firstNameTh + " " + myform.lastNameTh + " เรียบร้อยแล้ว")
            setOpen(false);
        }


    }
    function deleteUser(id) {
        firebase.database().ref("staff/" + id).set(
            {}
        )
        setOpen(false);
    }



    const handleSingupChange2 = (event) => {
        event.persist();
        setMyform(oldmyform => ({
            ...oldmyform,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSingupChange = key => event => {
        setMyform({ ...myform, [key]: event.target.value });
    };

    function handleDateChange(date) {
        setMyform({ ...myform, birdDate: date })
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function handleClickOpen(key) {
        setOpen(true);


        if (key.target === undefined) {
            if (staff[key].role === undefined)
                staff[key].role = []
            setMyform({ ...staff[key], code: key })
        }
        else {
            setMyform(initForm)

        }
    }

    function handleClose() {
        setOpen(false);
    }


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack.open}
                onClose={handleCloseSnack}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{snack.message}</span>}
            />
            <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen}>
                เพิ่มพนักงาน
            </Button>
            <Paper className={classes.table}>
                <div className={classes.tableWrapper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleClickOpen(row.code)}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ข้อมูลพนักงาน
                        </Typography>
                        <Button color="inherit" onClick={handleSubmit}>
                            Save
                         </Button>
                        <Button color="inherit" onClick={handleClose} type="submit">
                            Close
                         </Button>
                        {/* <Button variant="contained" size="medium" color="primary" onClick={() => console.log(myform)}>
                                JSON
                            </Button> */}
                    </Toolbar>
                </AppBar>

                <Container fixed style={{ marginTop: 25 }}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.title}>
                                    ข้อมูลส่วนตัว
                                    </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>

                                <TextField
                                    id="standard-select-prefixth"
                                    select
                                    label="คำนำหน้า"
                                    style={{ width: 75 }}
                                    name="prefixTh"
                                    value={myform.prefixTh}
                                    onChange={handleSingupChange2}
                                    className={classes.textField}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {prefixTh.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="standard-full-nameth"
                                    label="ชื่อจริง(ภาษาไทย)"
                                    placeholder="ระบุชื่อจริง"
                                    value={myform.firstNameTh}
                                    name="firstNameTh"
                                    onChange={handleSingupChange("firstNameTh")}
                                    margin="normal"
                                    className={classes.textField}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-namemidth"
                                    label="ชื่อกลาง(ภาษาไทย)"
                                    placeholder="ระบุชื่อกลาง"
                                    value={myform.middleNameTh}
                                    name="middleNameTh"
                                    onChange={handleSingupChange("middleNameTh")}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-namelastth"
                                    label="นามสกุล(ภาษาไทย)"
                                    placeholder="ระบุนามสกุล"
                                    value={myform.lastNameTh}
                                    name="lastNameTh"
                                    onChange={handleSingupChange("lastNameTh")}
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="standard-select-prefixen"
                                    select
                                    label="คำนำหน้า"
                                    value={myform.prefixEn}
                                    style={{ width: 75 }}
                                    name="prefixEn"
                                    onChange={handleSingupChange2}
                                    className={classes.textField}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {prefixEn.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="standard-full-nameen"
                                    label="ชื่อจริง(ภาษาอังกฤษ)"
                                    placeholder="ระบุชื่อจริง"
                                    margin="normal"
                                    value={myform.firstNameEn}
                                    name="firstNameEn"
                                    onChange={handleSingupChange("firstNameEn")}
                                    className={classes.textField}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-namemiden"
                                    label="ชื่อกลาง(ภาษาอังกฤษ)"
                                    placeholder="ระบุชื่อกลาง"
                                    value={myform.middletNameEn}
                                    name="middletNameEn"
                                    onChange={handleSingupChange("middletNameEn")}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-namelasten"
                                    label="นามสกุล(ภาษาอังกฤษ)"
                                    placeholder="ระบุนามสกุล"
                                    value={myform.lastNameEn}
                                    name="lastNameEn"
                                    onChange={handleSingupChange("lastNameEn")}
                                    className={classes.textField}
                                    required
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="standard-select-sex"
                                    select
                                    label="เพศ"
                                    value={myform.sex}
                                    onChange={handleSingupChange("sex")}
                                    className={classes.textField}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {sex.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={myform.birdDate}
                                        name="bridDate"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{ width: 150 }}
                                    />

                                </MuiPickersUtilsProvider>

                                <TextField
                                    id="standard-select-status"
                                    select
                                    label="สถานภาพ"
                                    value={myform.status}
                                    style={{ width: 75 }}
                                    onChange={handleSingupChange("status")}
                                    className={classes.textField}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {status.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="standard-full-nation"
                                    label="เชื้อชาติ"
                                    placeholder="ระบุเชื้อชาติ"
                                    value={myform.nation}
                                    name="nation"
                                    onChange={handleSingupChange("nation")}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-idcard"
                                    label="เลขบัตรประจำตัวประชาชน/หนังสือเดินทาง"
                                    placeholder="ระบุเลขบัตร"
                                    value={myform.idCard}
                                    type="number"
                                    name="idCard"
                                    onChange={handleSingupChange("idCard")}
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.title}>
                                    ข้อมูลสมาชิก
                                </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>

                                <TextField value={myform.displayName} id="outlined-displayName-input" label="Username" className={classes.textField} type="text" name="displayName" autoComplete='off'
                                    required={myform.code === "" && true} disabled={myform.code !== "" && true} margin="normal" onChange={handleSingupChange("displayName")} style={{ width: 150 }} />
                                <TextField value={myform.email} id="outlined-email-input" label="Email" className={classes.textField} type="email" name="email" autoComplete='off'
                                    required={myform.code === "" && true} disabled={myform.code !== "" && true} margin="normal" onChange={handleSingupChange("email")} />
                                <TextField value={myform.password || ''} id="outlined-password-input" label="password" className={classes.textField} type="password" name="password" autoComplete='off'
                                    required={myform.code === "" && true} disabled={myform.code !== "" && true} margin="normal" onChange={handleSingupChange("password")} />
                                <TextField value={myform.phoneNumber} id="outlined-phoneNumber-input" label="PhoneNumber" className={classes.textField} type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" name="phoneNumber" autoComplete='off'
                                    required={myform.code === "" && true} disabled={myform.code !== "" && true} margin="normal" onChange={handleSingupChange("phoneNumber")} />

                            </Grid>

                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.title}>
                                    ข้อมูลเพิมเติม
                                    </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="standard-full-position"
                                    label="ตำแหน่ง"
                                    placeholder="ระบุตำแหน่ง"
                                    margin="normal"
                                    value={myform.position}
                                    name="position"
                                    onChange={handleSingupChange("position")}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-money"
                                    label="เงินเดือน"
                                    placeholder="ระบุเงินเดือน"
                                    type="number"
                                    name="money"
                                    value={myform.money}
                                    onChange={handleSingupChange("money")}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">ความสามารถในการเข้าถึง</InputLabel>
                                    <Select
                                        multiple
                                        value={myform.role}
                                        onChange={handleChangeRole}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map(name => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={myform.role.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.title}>
                                    เอกสาร
                                    </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <Paper className={classes.paper}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" className={classes.title}>
                                                รูปบัตรประชาชน
                                    </Typography>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={10}>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                onChange={(e) => handleChangeUpload(e, "idCardImageURL")}
                                            />
                                            {(uploadValue > 0 && uploadValue < 100) && (<span>{uploadValue}%</span>)} {uploadValue === 100 && (<span>{messag}</span>)}
                                            {myform.idCardImageURL !== undefined &&
                                                <div><img style={{maxHeight:"500px" ,maxWidth:"500px"}} src={myform.idCardImageURL} alt="idCardImageURL" /></div>
                                            }
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" className={classes.title}>
                                                รูปทะเบียนบ้าน
                                    </Typography>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={10}>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                onChange={(e) => handleChangeUpload(e, "houseParticularsImageURL")}
                                            />
                                            {(uploadValue > 0 && uploadValue < 100) && (<span>{uploadValue}%</span>)} {uploadValue === 100 && (<span>{messag}</span>)}
                                            {myform.houseParticularsImageURL !== undefined &&
                                                <div><img style={{maxHeight:"500px" ,maxWidth:"500px"}} src={myform.houseParticularsImageURL} alt="houseParticularsImageURL" /></div>
                                            }


                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Paper>
                    {myform.code !== "" &&
                        <Button variant="contained" size="medium" color="secondary" onClick={() => deleteUser(myform.code)}>
                            Delete
                    </Button>
                    }
                </Container>

            </Dialog>

        </div>
    );
}

function mapStatetoProps(state) {
    return {
        menuList: state.menuList,
    }
}


export default connect(mapStatetoProps)(Staff)