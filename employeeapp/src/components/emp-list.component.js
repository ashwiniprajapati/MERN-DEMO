import React, {useState, useEffect} from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import CreateEmployee from './create-emp.component';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';


const EmployeeList = () => {
    
        let [empRowsAry, setEmpRowsAry] = useState([]);
        const [open, setOpen] = useState(false);
        const [isEdit, setEdit] = useState(false);
        const [initialData, setInitialData] = useState({});

        const handleEditEmp = (data) => (event) => {
            event.stopPropagation();
            setOpen(true);
            setEdit(true);
            setInitialData(data);
        };

        const handleDeleteEmp = (id) => (event) => {
            event.stopPropagation();
            // console.log(id);
            axios.delete(`http://localhost:8000/api/deleteEmployee/${id}`).then(res => {
                // console.log(res.data.data);
                if(res.data.status) {
                    empRowsAry = empRowsAry.filter(function( obj ) {
                        return obj._id !== id;
                    });
                    // we have an array of objects, we want to remove one object using only the id property
                    // console.log(empRowsAry);
                    setEmpRowsAry(empRowsAry);
                    alert(res.data.msg)
                } else {
                    alert(res.data.msg)
                }
            });
        }

        const columns = [
            { field: 'id', headerName: 'Sr No.', width: 100 },
            { field: 'firstName', headerName: 'First Name', width: 200 },
            { field: 'lastName', headerName: 'Last Name', width: 200 },
            { field: 'email', headerName: 'Email', width: 300 },
            { field: 'contact', headerName: 'Contact', width: 200 },
            { field: 'address', headerName: 'Address', width: 200 },
            {
                field: 'actions',
                type: 'actions',
                width: 100,
                getActions: (data) => {
                   return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditEmp(data.row)} />,
                    <GridActionsCellItem icon={<DeleteIcon />} onClick={handleDeleteEmp(data.id)} label="Delete" />,
                   ];
                },
              },
        ];
        
    
        useEffect(()=>{
            axios.get('http://localhost:8000/api/').then(res => {
                // console.log(res.data.data);
                let resultData = res.data.data;
                
                resultData = resultData.map((v,k) => {
                    let id = k + 1;
                    // console.log(id);
                    return {"id":id,...v};
                });
                setEmpRowsAry(resultData);
            });
        },[]);

        const addNewEmp = (data,addEditFlag) => {
            
            // console.log(addEditFlag);
            let newEmp;
            if(addEditFlag === true) { // for edit
                console.log(data);
                // console.log(empRowsAry);

                // empRowsAry.forEach(el => {
                //     if (el['_id'] === data._id) {
                //         el = data
                //     }
                // })
                // console.log("after update",empRowsAry);
                // console.log(empRowsAry.map((emp) => {return emp._id}).indexOf(data._id));
                
                //Log object to console again.

                // newEmp = {...data};
                let finalResp = data;
                finalResp = finalResp.map((v,k) => {
                    let id = k + 1;
                    // console.log(id);
                    return {"id":id,...v};
                });
                setEmpRowsAry(finalResp);

            } else { //for add

                newEmp = {"id":empRowsAry.length + 1,...data};
                setEmpRowsAry([...empRowsAry,newEmp]);
            }

        }
        
        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
            setEdit(false);
            setInitialData({});
        };
        // console.log(empRowsAry);

        return (
            <>
            <CreateEmployee addEditEmpDataToGrid={addNewEmp} open={open} handleClose={handleClose} isEdit={isEdit} initialData={initialData}/>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Employee
            </Button>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={empRowsAry} columns={columns} getRowId={(row) => row._id} />
            </div>
            </>
        );
} 

export default EmployeeList;

