import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';


export default class MenuCard extends Component {
    render() {
        return (
            <div>
                <Badge color="primary" badgeContent={this.props.amount}>
                    <Card onClick={this.props.onClick}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={this.props.imgUrl}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <b> {this.props.menuName}</b>
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                    ราคา <b>{this.props.price}</b> บาท
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Badge>
            </div>
        )
    }
}
