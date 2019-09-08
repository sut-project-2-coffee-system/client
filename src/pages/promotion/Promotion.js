import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CardActions from '@material-ui/core/CardActions';
import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
    },
}));

const data = {
    typeName: '',
    discount: '',
    fullBuy: '',
    startDate: new Date(),
    endDate: new Date()
}

function Promotion(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        typeName: '',
        discount: '',
        fullBuy: '',
        startDate: new Date(),
        endDate: new Date()
    });

    function handleChange(event) {
        event.persist();
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    function handleStartDateChange(date) {
        setValues(oldValues => ({
            ...oldValues,
            startDate: date,
        }));
    }

    function handleEndDateChange(date) {
        setValues(oldValues => ({
            ...oldValues,
            endDate: date,
        }));
    }
    function handleSubmit(event){
        event.preventDefault();
        if (values.typeName !== '') {
            let str = ''
            if(values.typeName === 'ลดเป็นบาท')
                str = 'ซื้อครบ '+ values.fullBuy + ' บาท ลด ' + values.discount + ' บาท'
            else
                str = 'ซื้อครบ '+ values.fullBuy + ' บาท ลด ' + values.discount + ' เปอร์เซ็น'
            firebase.database().ref('promotion').child(values.typeName).push().set({
                name: str,
                value: values.discount,
                startDate: values.startDate.getTime(),
                endDate: values.endDate.getTime()
            })
            setValues(data)
        }  
    }
    
    return (
    <form onSubmit={handleSubmit}>
        <Card className={'MuiElevatedCard--01'} >
            <CardHeader
                className={'MuiCardHeader-root'}
                title={'โปรโมชัน'}
                subheader={'สร้างโปรโมชั่นใหม่'}
                classes={{
                    title: 'MuiCardHeader-title',
                    subheader: 'MuiCardHeader-subheader',
                }} />
            <CardContent className={'MuiCardContent-root'}>
                <div className={'MuiCardContent-inner'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h5" >
                            ประเภทโปรโมชั่น:{values.typeName}
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-simple">
                            ประเภทโปรโมชั่น
                        </InputLabel>
                        <Select
                            value={values.typeName}
                            onChange={handleChange}
                            input={<OutlinedInput name="typeName" id="outlined-age-simple" />}>
                            {['ลดเป็นบาท', 'ลดเป็นเปอร์เซ็น'].map((typeName, index) => {
                                return <MenuItem value={typeName} key={index}>{typeName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h5" >
                            เงื่อนไขโปรโมชั่น:
                        </Typography>
                     </Grid>
                     <Grid item xs={2}>
                        <Typography color="textPrimary" variant="h6" >
                            ซื้อครบ(บาท):
                        </Typography>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl fullWidth className={classes.margin}>
                            <Input id="adornment-amount" value={values.fullBuy} name="fullBuy" onChange={handleChange} placeholder="ซื้อครบ(บาท)" type="number"
                            startAdornment={<InputAdornment position="start">฿</InputAdornment>}
                            />
                        </FormControl>
                     </Grid>
                     <Grid item xs={2}>
                        <Typography color="textPrimary" variant="h6" align='center'>
                            ลด (฿ / %):
                        </Typography>
                     </Grid>
                     <Grid item xs={4}>
                     <FormControl fullWidth className={classes.margin}>
                            <Input id="adornment-amount" value={values.discount} name="discount" onChange={handleChange} placeholder="ลด(บาท หรือ เปอร์เซ็น)" type="number"/>
                        </FormControl>
                     </Grid>    
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h5" >
                            ระยะเวลาโปรโมชั่น:
                        </Typography>
                     </Grid>
                     <Grid item xs={2}>
                         <br />
                        <Typography color="textPrimary" variant="h6" >
                            จาก (Start Date):
                        </Typography>
                     </Grid>
                     <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker margin="normal" id="date-picker-dialog" name="stateDate" label="Start Date" format="dd/MM/yyyy" value={values.startDate} onChange={handleStartDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }} minDate={new Date()} style={{width: '100%'}}/>
                        </MuiPickersUtilsProvider>
                     </Grid>
                     <Grid item xs={2} >
                         <br />
                        <Typography color="textPrimary" variant="h6">
                            ถึง (End Date):
                        </Typography>
                     </Grid>
                     <Grid item xs={4}>
                        <Typography color="textPrimary" variant="h5" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker margin="normal" id="date-picker-dialog"  label="End Date" format="dd/MM/yyyy" value={values.endDate} onChange={handleEndDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }} minDate={new Date()} style={{width: '100%'}}/>
                        </MuiPickersUtilsProvider>
                        </Typography>
                     </Grid>
                     </Grid >
                </div >
            </CardContent>
            <CardActions >
                <Grid container justify='flex-end'>
                    <Grid item >
                        <Button variant="outlined" size="large" color="primary" type="submit" >
                            ADD NEW PROMOTION
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
        </form>
    );
}

function mapStatetoProps(state) {
    return {
        promotionList: state.promotionList,
    }
}

export default connect(mapStatetoProps)(Promotion);
