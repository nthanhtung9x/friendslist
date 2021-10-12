import React, { useEffect, useState } from 'react';
import { Container, Button, Form, FormGroup, Input, Row, Col, Card, Toast, ToastHeader, ToastBody, } from 'reactstrap';
import FriendItem from '../../components/FriendItem';
import { ItemProps } from '../../models/ItemProps';
import { toast } from 'react-toastify';
import './home.css';
interface Props {
    
}

const ErrorMessageList: any = {
    EmptyName: 'Please enter your name',
    EmptyWalletAddress: 'Please enter your wallet address',
    WalletAddressIsValid: 'wallet address invalid',
    EmptyEmail: 'Please enter your email',
}

const Home = (props: Props) => {
    const [data, setData] = useState({
        name: '',
        walletAddress: '',
        email: '',
    });

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: any = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const formValidation = () => {
        const { name, walletAddress, email } = data;
        let code: string = '';
        if(!name) {
            code = 'EmptyName'
        } else if(!walletAddress) {
            code = 'EmptyWalletAddress'
        } else if(!email) {
            code = 'EmptyEmail'
        } else if(!walletAddress.match("^0x[0-9a-fA-F]{40}$")) {
            code = 'WalletAddressIsValid'
        }
        return code;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = formValidation();
        console.log(isValid);
        if(isValid) {
            toast.warning(ErrorMessageList[isValid]);
            return;
        }
        setLoading(true);
        const cloneArr: any = [...list];
        cloneArr.push({
            id: (Math.random() * 1000).toString(),
            ...data,
        });
        localStorage.setItem('friendsList', JSON.stringify(cloneArr));
        setData({
            name: '',
            walletAddress: '',
            email: '',
        });
        toast.success('add account success!!!');
    }

    const handleUpdate = (id: string, updateData: ItemProps, oldData: ItemProps) => {
        if(JSON.stringify(oldData) === JSON.stringify(updateData)) {
            return;
        } else {
            const index = list.findIndex((item: ItemProps) => item.id === id);
            const arrayState: any = [...list];
            if(index !== -1) {
                setLoading(true);
                arrayState.splice(index, 1, updateData);
                localStorage.setItem('friendsList', JSON.stringify(arrayState));
                toast.success('Update account success!!!');
            }
        }
    }


    const handleDelete = (id: string) => {
        const index = list.findIndex((item: ItemProps) => item.id === id);
        const arrayState: any = [...list];
        if(index !== -1) {
            setLoading(true);
            arrayState.splice(index, 1);
            localStorage.setItem('friendsList', JSON.stringify(arrayState));
            toast.success('delete account success!!!');
        }
    };

    const renderFriendsList = (list: any) => {
        if(list.length) {
            return list.map((item: any) => {
                return <FriendItem 
                    key={item.id} 
                    item={item}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            })
        }
        return null;
    }

    useEffect(() => {
        const listStorage: any = localStorage.getItem('friendsList') ? localStorage.getItem('friendsList') : "";
        const rs = listStorage ? JSON.parse(listStorage) : [];
        setList(rs);
    },[]);

    useEffect(() => {
        if(loading) {
            const listStorage: any = localStorage.getItem('friendsList') ? localStorage.getItem('friendsList') : "";
            const rs = listStorage ? JSON.parse(listStorage) : [];
            setList(rs);
            setLoading(false);     
        }
    },[loading]);

    return (
        <Container className="themed-container ">
            <Container className="mt-4">
                <article>Form</article>
                <Form
                    onSubmit={handleSubmit}
                >
                    <FormGroup className="my-3">
                        <Input type="text" name="name" placeholder="Name" onChange={handleChange}
                            value={data.name}
                        />
                    </FormGroup>
                    <FormGroup className="my-3">
                        <Input type="text" name="walletAddress" placeholder="Wallet Address" onChange={handleChange}
                            value={data.walletAddress}
                        />
                    </FormGroup>
                    <FormGroup className="my-3">
                        <Input type="email" name="email" placeholder="Email" onChange={handleChange}
                            value={data.email}
                        />
                    </FormGroup>
                    <FormGroup className="my-3">
                        <Button block className="w-100" 
                        color="primary"
                        type="submit"
                        disabled={loading}
                    >Add account</Button>
                    </FormGroup>
                </Form>
            </Container>

            <Container className="mt-4">
                <article>Friends</article>
                    <Row>  
                        {
                            list.length ?
                                renderFriendsList(list)
                            :
                            <h2>Friends list empty.</h2>
                        }
                    </Row>
            </Container>
        </Container>
    )
}

export default Home
