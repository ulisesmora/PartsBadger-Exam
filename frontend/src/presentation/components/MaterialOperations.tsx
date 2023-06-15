import {
    Col,
    Row,
    Table,
    Text,
    StyledBadge,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import inventoryApi from "../../services/api/inventoryApi";
import { format } from "date-fns";
import { OperationInformation } from "../../domain/interfaces/OperationInformation";
import { MateriaContext } from "../screens/Dashboard";

export default function MaterialOperations() {

    
    const { operation, inventory, material  } = useContext(MateriaContext)

    const columns = [
        { name: "OPERATION", uid: "operation" },
        { name: "QUANTITY", uid: "quantity" },
        { name: "INVENTORY", uid: "inventory" },
        { name: "CREATED", uid: "created" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const [materialList, setMaterialList] = useState<OperationInformation[]>([]);

    useEffect(() => {
        GetMaterialList();
    }, [operation,inventory,material]);

    async function GetMaterialList() {
        try {
            const response = await inventoryApi.get<OperationInformation[]>(
                "api/inventoryoperations/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setMaterialList(() => response.data);
            console.log(response.data, "data");
        } catch (error) {
            console.log(error);
        }
    }

    const renderCell = (material: OperationInformation, columnKey: React.Key) => {
        switch (columnKey) {
            case "operation":
                return <Text>{material.operation}</Text>;
            case "quantity":
                return (
                    <Col>
                        <Row>
                            <StyledBadge
                                color={
                                    material.operation === "ADDINVENTORY" ? "success" : "error"
                                }
                            >
                                {material.quantity}
                            </StyledBadge>
                        </Row>
                    </Col>
                );

            case "inventory":
                return (
                    <StyledBadge color={"primary"}>{material.inventory}</StyledBadge>
                );

            case "created":
                return (
                    <Text>{format(new Date(material.created), "dd-MM-yyyy hh:mm")}</Text>
                );
        }
    };
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Table
                aria-label="Example table with custom cells"
                css={{
                    height: "auto",
                    maxWidth: "80%",
                    minWidth: "1100px",
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
                    {(item: OperationInformation) => (
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
