import React from 'react';
import { Typography } from '@material-ui/core';

export default ({product}) => (
    <div>
        <Typography variant="display1">{product.title}</Typography>
        <Typography variant="display1">{product.slug}</Typography>
        <Typography variant="display1">{product.price}</Typography>
        <Typography variant="display1">{product.description}</Typography>
    </div>
);