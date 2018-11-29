import React from 'react';
import { Typography } from '@material-ui/core';

export default () => (
    <div>
        <Typography variant="display1">save product</Typography>

        <form onSubmit={this.handleSubmit}>
            <label>
            Name: <input type="text" ref={(input) => this.input = input} />
            </label>

            <input type="submit" value="Submit" />
        </form>
    </div>
);