import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import { serviceType } from '../../models/service';


interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SpoolType({ value, onChange }: Props) {

    const spoolTypes: string[] = [];

    for (const type in serviceType) {
        if (Number.isNaN(Number(type))) {
            spoolTypes.push(type);
        }
    }

    return (
        <FormControlLabel
            label={''}
            control={(
                <Select
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    size={'small'}
                    margin={'dense'}
                >
                    {spoolTypes.map((type, val) => (
                        <MenuItem
                            key={val}
                            value={type}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    );
}
