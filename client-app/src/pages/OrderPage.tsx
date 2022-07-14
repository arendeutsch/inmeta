import React from 'react';
import MUIDataTable, { MUIDataTableMeta, MUIDataTableOptions } from 'mui-datatables';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import ServiceType from '../components/ServiceType/ServiceType';
import { serviceType } from '../models/service';
import { Order } from '../models/order';

interface Props {
    data: Order[];
    onUpdate: (order: any) => void;
    onDelete: (id: string) => void;
    onValueChange: (data: any) => void;
}

export default function OrderPage({ data, onUpdate, onDelete, onValueChange }: Props) {
    const options: MUIDataTableOptions = {
        elevation: 1,
        filter: false,
        viewColumns: false,
        download: true,
        print: false,
        filterType: 'checkbox',
        responsive: 'standard',
        fixedHeader: true,
        selectableRows: 'none',
        rowsPerPage: 10,
    };

    function renderCellProps() {
        return {
            style: { padding: '5px' },
        };
    }

    function handleStateUpdate(id: string, key: string, newValue: any) {
        let updatedEntry: Order;
        const tableEntry: Order | undefined = data.find(obj => obj.id === id);
        const index = data.findIndex(obj => obj.id === id);

        if (tableEntry) {
            updatedEntry = {
                ...tableEntry,
                [key]: newValue
            };

            const newData = [...data];
            newData[index] = updatedEntry;

            onValueChange(newData);
        }
    }

    function handleEdit(data: any[]) {
        const updatedOrder: Order = {
            id: data[0],
            name: data[1],
            phone: data[2],
            email: data[3],
            source: data[4],
            destination: data[5],
            service: data[6],
            deadline: data[7],
            note: data[8],
        };

        onUpdate(updatedOrder);
    }

    function renderSaveButton(val: any, tableMeta: MUIDataTableMeta): React.ReactNode {
        return (
            <IconButton
                color={'success'}
                onClick={() => handleEdit(tableMeta.rowData)}
            >
                <DoneAllIcon />
            </IconButton>
        );
    }

    function renderDeleteButton(val: any, tableMeta: MUIDataTableMeta): React.ReactNode {
        return (
            <IconButton
                color={'error'}
                onClick={() => onDelete(tableMeta.rowData[0])}
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderValueRow(value: any, tableMeta: MUIDataTableMeta, updateValue: any, type: 'text' | 'select' = 'text') {
        if (tableMeta.rowData[0] === undefined) return;

        switch (tableMeta.columnData.name) {
            case 'name':
                return (
                    <FormControlLabel
                        style={{
                            margin: 0,
                            maxWidth: 80,
                        }}
                        label={''}
                        value={value}
                        control={<TextField size={'small'} value={value || ''} margin={'dense'} variant={'standard'} />}
                        onChange={(event: any) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, event.target.value)}
                    />
                );
            case 'phone':
                return (
                    <FormControlLabel
                        style={{
                            margin: 0,
                            maxWidth: 150,
                        }}
                        label={''}
                        value={value}
                        control={<TextField size={'small'} value={value || ''} margin={'dense'} variant={'standard'} />}
                        onChange={(event: any) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, event.target.value)}
                    />
                );
            case 'deadline':
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            inputFormat={'dd/MM/yyyy'}
                            value={value}
                            onChange={(newValue: any) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, newValue)}
                            renderInput={(params) => <TextField {...params} margin={'dense'} size={'small'} variant={'standard'} />}
                        />
                    </LocalizationProvider>
                );
            case 'note':
                return (
                    <FormControlLabel
                        style={{
                            margin: 0,
                            minWidth: 250,
                        }}
                        label={''}
                        value={value}
                        control={<TextField size={'small'} value={value || ''} multiline={true} fullWidth={true} minRows={2} />}
                        onChange={(event: any) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, event.target.value)}
                    />
                );
            case 'service':
                return (
                    <ServiceType
                        value={serviceType[tableMeta.rowData[6] as serviceType]}
                        onChange={(value: string) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, value)}
                    />
                );
            default:
                return (
                    <FormControlLabel
                        style={{
                            margin: 0,
                        }}
                        label={''}
                        value={value}
                        control={<TextField size={'small'} value={value || ''} margin={'dense'} variant={'standard'} />}
                        onChange={(event: any) => handleStateUpdate(tableMeta.rowData[0], tableMeta.columnData.name, event.target.value)}
                    />
                );
        }
    }

    const columns = [
        {
            name: 'id',
            label: 'Id',
            options: {
                filter: false,
                sort: false,
                display: false,
            },
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'phone',
            label: 'Phone',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'source',
            label: 'Source',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'destination',
            label: 'Destination',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'service',
            label: 'Service',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue, 'select'),
            }
        },
        {
            name: 'deadline',
            label: 'DeadLine',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: 'note',
            label: 'Note',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: any, tableMeta: MUIDataTableMeta, updateValue: any) => renderValueRow(value, tableMeta, updateValue),
            }
        },
        {
            name: '',
            label: '',
            options: {
                filter: false,
                sort: false,
                empty: false,
                customBodyRender: (val: any, tableMeta: any) => renderDeleteButton(val, tableMeta),
                setCellProps: () => (renderCellProps()),
            },
        },
        {
            name: '',
            label: '',
            options: {
                filter: false,
                sort: false,
                empty: false,
                customBodyRender: (val: any, tableMeta: any) => renderSaveButton(val, tableMeta),
                setCellProps: () => (renderCellProps()),
            },
        },
    ];


    return (
        <div
            style={{
                margin: 10,
            }}
        >
            <MUIDataTable
                title={''}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}