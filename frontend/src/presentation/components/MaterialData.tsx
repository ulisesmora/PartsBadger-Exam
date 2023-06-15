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
import { Material } from "../../domain/interfaces/MaterialInformation";
import {  useContext, useEffect, useState } from "react";
import inventoryApi from "../../services/api/inventoryApi";
import { format } from "date-fns";
import { MateriaContext } from "../screens/Dashboard";




export default function MaterialData() {


    const { material  } = useContext(MateriaContext)
    

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "QUANTITY", uid: "quantity" },
        { name: "CREATED", uid: "created" },
        { name: "STATUS", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const [materialList, setMaterialList] = useState<Material[]>([])

    useEffect(() => {
        GetMaterialList()
    }, [material])

    async function GetMaterialList() {
        try {
            const response = await inventoryApi.get<Material[]>('api/inventorymaterial/',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMaterialList(() => response.data)
        } catch (error) {
            console.log(error)
        }
    }



    const renderCell = (material: Material, columnKey: React.Key) => {
        
        switch (columnKey) {
            case "name":
                return (
                    <Text>{material.name}</Text>
                );
            case "quantity":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {material.quantity}
                            </Text>
                        </Row>
                    </Col>
                );
             
            case "created":
                return <Text>{format( new Date(material.created) , 'dd-MM-yyyy hh:mm' )}</Text>    


            case "status":
                return <StyledBadge color={!material.deleted ? 'success' : 'error'} >{!material.deleted ? 'active' : 'inactive'}</StyledBadge>;

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
                    {(item: Material) => (
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
