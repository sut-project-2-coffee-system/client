import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import firebase from '../../../Firebase'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 'auto',
    maxHeight: 250,
  },
  media: {
    height: 2,
  },
  bigAvatar: {
    width: 75,
    height: 75,
    marginTop: 15,
    marginLeft: 5
  },
});

async function handleClick(order,member) {
  let orderTarget
  firebase.database().ref(`order/${order.key}`).on('value', function (snapshot) {
    orderTarget=snapshot.val()
    orderTarget.status = 'done'
    orderTarget.timestamp = Date.now()
  });
  firebase.database().ref(`order/${order.key}`).update(orderTarget)
  let msg = 'เรียนคุณ'+order.orderBy+' ตอนนี้ออเดอร์ของคุณทำเสร็จแล้วครับ'
  await fetch('https://us-central1-coffe-system-yiakpd.cloudfunctions.net/LineMessagingAPI', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: member.userId,
      messages: msg
    })
  }).then(res => {
    console.log(res);
  }).then(err => {
    console.log(err);
  });
}

export default function OrderCard(props) {  

  const findIndex = (item) =>{
    let indexData = 0
    if (props.memberList !== undefined && item !== undefined) {
        props.memberList.find((cur, i) => {
            if (cur.key === item.lineProfile)
                indexData = i
            return cur.key === item.lineProfile
        })
        return props.memberList[indexData]
    }
  }

  const classes = useStyles();
  let member = findIndex(props.orderselect)
  return (
    <Card className={classes.root}>
      {member !== undefined &&
      <Grid container >
        <Grid item xs={2}>
          <Avatar alt="Remy Sharp" src={member.pictureUrl} className={classes.bigAvatar} />
        </Grid>
        <Grid item xs={10}>
          <CardContent >
            <Typography component="p">
              สั่งโดยคุณ: {props.orderselect.orderBy}<br />
              สถานะ: {props.orderselect.pay}<br />
              เบอร์ติดต่อ: {props.orderselect.tel}<br />
              สถานที่: {props.orderselect.location1.split(", l")[0]}<br />
              รายละเอียด: {props.orderselect.location2}
            </Typography>
            {props.orderselect.location1.split(", l")[1] !== undefined && props.orderselect.location1.split(", l")[2] !== undefined && <div>Google Map : <a href={"https://maps.google.com/maps?daddr="+props.orderselect.location1.split(", l")[1].split(": ")[1]+","+props.orderselect.location1.split(", l")[2].split(": ")[1]+"&amp;ll="}>ลิงค์สำหรับเปิด</a></div>}
          </CardContent>
        </Grid>
        <CardActions align="end" >
          <Button size="large" color="primary" variant='outlined'  onClick={() => handleClick(props.orderselect,member)}>
            เสร็จแล้ว
            </Button>
        </CardActions>
      </Grid>}
    </Card>
  );
}