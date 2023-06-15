import {
    Col,
    Row,
    Table,
    Text,
    Tooltip,
    StyledBadge,
    Button,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./RemoveIcon";
import {  useContext, useEffect, useState } from "react";
import inventoryApi from "../../services/api/inventoryApi";
import { format } from "date-fns";
import { Inventory } from "../../domain/interfaces/InventoryInformation";
import { MateriaContext } from "../screens/Dashboard";



export default function MaterialInventory() {


    const { inventory  } = useContext(MateriaContext)

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "DESCRIPTION", uid: "description" },
        { name: "QUANTITY", uid: "quantity" },
        { name: "SKU", uid: "sku" },
        { name: "CREATED", uid: "created" },
        { name: "MATERIAL", uid: "material" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const [materialList, setMaterialList] = useState<Inventory[]>([])

    useEffect(() => {
        GetInventoryList()
    }, [inventory])

    async function GetInventoryList() {
        try {
            const response = await inventoryApi.get<Inventory[]>('api/inventoryinventory/',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMaterialList(() => response.data)
            console.log(response.data,'data');
        } catch (error) {
            console.log(error)
        }

    }



    const renderCell = (material: Inventory, columnKey: React.Key) => {
        
        switch (columnKey) {
            case "name":
                return (
                    <Text>{material.name}</Text>
                );
            case "description":
                return (
                    <Text>{material.description}</Text>
                );    
            case "quantity":
                return (
                        <Text>{material.quantity}</Text>
                    );      
            case "sku":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {material.sku}
                            </Text>
                        </Row>
                    </Col>
                );
             
            case "created":
                return <Text>{format( new Date(material.created) , 'dd-MM-yyyy hh:mm' )}</Text>    


            case "material":
                return <StyledBadge color={'primary'}  >{material.material}</StyledBadge>;

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Edit"
                                color={"primary"}
                                contentColor={"inherint"}
                                css={undefined}
                            >
                                <Button auto light icon={<EditIcon size={20} fill="#979797" />} ></Button>

                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete"
                                color="primary"
                                onClick={() => console.log("Delete user", material.id)}
                                css={undefined}
                                contentColor={"inherint"}
                            >
                                <Button auto light icon={<DeleteIcon size={20} fill="#FF0080" />} >

                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                );
        }
    };
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Table
                aria-label="Example table with custom cells"
                css={{
                    height: "auto",
                    maxWidth: '80%',
                    minWidth: '1100px'
                }}
                selectionMode="none"
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column
                            key={column.uid}
                            hideHeader={column.uid === "actions"}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={materialList}>
                    {(item: Inventory) => (
                        <Table.Row>
                            {(columnKey) => (
                                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    );
}
