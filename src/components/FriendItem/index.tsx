import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormGroup, Input, Row } from 'reactstrap';
import { ItemProps } from '../../models/ItemProps';
import './friendItem.css';

interface Props {
    item : any;
    handleUpdate: (id: string, updateData: ItemProps, oldData: ItemProps) => void;
    handleDelete: (id: string) => void;
}

const FriendItem = (props: Props) => {
    const { item, handleUpdate, handleDelete } = props;
    const [toggleUpdate, setToggleUpdate] = useState(false);

    const [updateData, setUpdateData] = useState<any>({
        id: item.id,
        name: item.name,
        walletAddress: item.walletAddress,
        email: item.email,
    });

    const handleChangeUpdate = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: any = e.target;
        setUpdateData({
            ...updateData,
            [name]: value
        });
    }

    return (
        <Col sm="6" className="mb-4" key={item?.id}>
                <Card className="py-3 item">
                    <Row className="justify-content-between">
                        <Col sm="8" className="mx-1">
                            <FormGroup className="my-1">
                                <Input type="text" name="name" placeholder="Name" value={updateData?.name}
                                    disabled={!toggleUpdate}
                                    className={!toggleUpdate ? 'active' : ''}
                                    onChange={handleChangeUpdate}
                                />
                            </FormGroup>
                            <FormGroup className="my-1">
                                <Input type="text" name="walletAddress" placeholder="Wallet Address" value={updateData?.walletAddress}
                                    disabled={!toggleUpdate}
                                    className={!toggleUpdate ? 'active' : ''}
                                    onChange={handleChangeUpdate}
                                />
                            </FormGroup>
                            <FormGroup className="my-1">
                                <Input type="text" name="email" placeholder="Email" value={updateData?.email}
                                    disabled={!toggleUpdate}
                                    className={!toggleUpdate ? 'active' : ''}
                                    onChange={handleChangeUpdate}
                                />        
                            </FormGroup>
                        </Col>
                        <Col sm="3" className="d-flex flex-column align-items-end">
                            <Button 
                                color={toggleUpdate ? 'primary' : 'success'} 
                                className="w-100" 
                                onClick={() => {
                                    handleUpdate(item.id, updateData, item)
                                    setToggleUpdate(!toggleUpdate)
                                }}
                            >
                                {
                                    toggleUpdate ? 'Confirm' : 'Update'
                                }
                            </Button>
                            <Button 
                                color="danger" 
                                className="w-100" 
                                onClick={() => {
                                    handleDelete(item.id)
                                    setToggleUpdate(!toggleUpdate)
                                }}
                            >Delete</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
    )
}

export default FriendItem
