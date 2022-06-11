import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, styled, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Btn from './formsui/button';
import Textfield from './formsui/textfield';
import axios from 'axios';
  
const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    address: ''
};

const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Required'),
    contact: Yup.number()
      .integer()
      .typeError('Please enter a valid contact number')
      .required('Required'),
    address: Yup.string()
      .required('Required'),
  });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
const CreateEmployee =(props) => {
    
    
    // const classes = useStyles();
    // console.log(props.open)
  
    return (
      <div>
        
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={props.open}
        >
          
          <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {props.isEdit ? 'Edit': 'Add'} Employee 
          </BootstrapDialogTitle>
          
          <DialogContent dividers>
            <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="md">
                <div>
                    <Formik
                        initialValues={{
                            ...INITIAL_FORM_STATE, ...props.initialData
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={reqData => {
                            // alert("ok");
                            // console.log(reqData);
                            if(props.isEdit) { //for edit
                              axios.put('http://localhost:8000/api/updateEmployee',reqData).then(res => {
                                if(res.data.status) {
                                  // console.log(res.data.data);
                                  props.handleClose();
                                  props.addEditEmpDataToGrid(res.data.data,true);
                                  alert(res.data.msg)
                                }
                                else {
                                    alert(res.data.msg)
                                }
                              });
                            } else { //for add
                              axios.post('http://localhost:8000/api/addEmployee',reqData).then(res => {
                                if(res.data.status) {
                                  // console.log(res.data.data);
                                  props.handleClose();
                                  props.addEditEmpDataToGrid(res.data.data,false);
                                  alert(res.data.msg)
                                }
                                else {
                                    alert(res.data.msg)
                                }
                              });
                            }
                        }}
                        >
                       
                        <Form>

                            <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Typography>
                                Employee details
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Textfield
                                name="firstName"
                                label="First Name"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Textfield
                                name="lastName"
                                label="Last Name"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield
                                name="email"
                                label="Email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield
                                name="contact"
                                label="Contact"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>
                                Address
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield
                                name="address"
                                label="Address"
                                multiline={true}
                                rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Btn>
                                Submit Form
                                </Btn>
                            </Grid>

                            </Grid>

                        </Form>
                    
                    </Formik>
                </div>
                </Container>
            </Grid>
        </Grid>
        </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }
export default CreateEmployee;
