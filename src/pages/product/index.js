import React from 'react';
import { Typography } from '@material-ui/core';

export default () => (
    <div>
        <Typography variant="display1">save product</Typography>

        <form>
            <label>
            Name: <input type="text" />
            </label>

            <input type="submit" value="Submit" />
        </form>
    </div>
);