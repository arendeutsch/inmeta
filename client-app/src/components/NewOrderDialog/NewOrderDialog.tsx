import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NewOrder } from '../../models/order';
import { serviceType } from '../../models/service';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction={'up'} ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (newOrder: NewOrder) => void;
}

export default function NewOrderDialog({ open, onClose, onCreate }: Props) {
    const [state, setState] = useState<NewOrder>({
        name: '',
        email: '',
        phone: '',
        source: '',
        destination: '',
        service: 'Moving' as serviceType,
        deadline: new Date(),
        note: '',
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent, type: string) {
        setState(prevState => ({
            ...prevState,
            [type]: type === 'deadline' ? event : event.target.value,
        }));
    }

    function validateEmail(email: string) {
        return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    };

    function validateText(text: string) {
        return text.length < 3;
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted={true}
                onClose={onClose}
                fullWidth={true}
            >
                <DialogTitle>{'New Order Form'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill the following information to register a new order
                    </DialogContentText>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <TextField
                                margin={'dense'}
                                id={'name'}
                                label={'Name'}
                                type={'text'}
                                variant={'standard'}
                                value={state.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'name')}
                                error={validateText(state.name) ? true : false}
                                helperText={validateText(state.name) ? 'Number must be at least 3 letters' : null}
                            />
                            <TextField
                                margin={'dense'}
                                id={'phone'}
                                label={'Phone'}
                                type={'number'}
                                variant={'standard'}
                                value={state.phone}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'phone')}
                                error={validateText(state.phone) ? true : false}
                                helperText={validateText(state.phone) ? 'Name must be at least 3 letters' : null}
                            />
                        </div>
                        <TextField
                            margin={'dense'}
                            id={'email'}
                            label={'Email Address'}
                            type={'email'}
                            variant={'standard'}
                            value={state.email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'email')}
                            error={validateEmail(state.email) === null ?? ''}
                            helperText={validateEmail(state.email) === null ? 'some@example.com' : ''}
                        />
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}
                        >
                            <TextField
                                margin={'dense'}
                                id={'from'}
                                label={state.service === 'Moving' ? 'Moving From' : 'Address'}
                                type={'text'}
                                variant={'standard'}
                                value={state.source}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'source')}
                                error={validateText(state.source) ? true : false}
                                helperText={validateText(state.source) ? 'Address must be at least 3 letters' : null}
                            />
                            <TextField
                                style={{
                                    visibility: state.service === 'Moving' ? 'visible' : 'hidden',
                                }}
                                margin={'dense'}
                                id={'to'}
                                label={'Moving To'}
                                type={'text'}
                                variant={'standard'}
                                value={state.destination}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'destination')}
                                error={validateText(state.destination) ? true : false}
                                helperText={validateText(state.destination) ? 'Address must be at least 3 letters' : null}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Select
                                value={state.service}
                                onChange={(event: SelectChangeEvent) => handleChange(event, 'service')}
                                label={'Service'}
                                variant={'standard'}
                            >
                                <MenuItem value={'Moving'}>Moving</MenuItem>
                                <MenuItem value={'Packing'}>Packing</MenuItem>
                                <MenuItem value={'Cleaning'}>Cleaning</MenuItem>
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    inputFormat={'dd/MM/yyyy'}
                                    value={state.deadline}
                                    onChange={(newValue: any) => handleChange(newValue, 'deadline')}
                                    renderInput={(params) => <TextField {...params} margin={'dense'} size={'small'} variant={'standard'} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <TextField
                            margin={'dense'}
                            id={'note'}
                            label={'Note'}
                            type={'text'}
                            multiline={true}
                            minRows={2}
                            variant={'standard'}
                            value={state.note}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'note')}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={() => onCreate(state)}>Register</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
