import { Button, Link, Modal, Text } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react";
import FormInventory from "../forms/FormInventory";
import FormMaterial from "../forms/FormMaterial";
import FormOperation from "../forms/FormOperation";
import { MateriaContext } from "../screens/Dashboard";


interface ButtonOption {
    name: string
}

export default function CreateOptions({ name }: ButtonOption) {

    const { operation, material, inventory  } = useContext(MateriaContext)
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    useEffect(() => {
        closeHandler()
    }, [operation,material,inventory])
    

    return (
        <>
            <Button
                onPress={handler}
                color="error"
                auto
                flat
                as={Link}
                href="#"
            >
                Create  {name}
            </Button>

            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>

                        <Text b size={18}>
                            Create {name}
                        </Text>
                    </Text>

                </Modal.Header>

                <Modal.Body >
                    {name === "material" &&
                        <FormMaterial />
                    }
                    {name === "inventory" &&
                        <FormInventory />
                    }
                    {name === "operation" &&
                        <FormOperation />
                    }
                </Modal.Body>

            </Modal>
        </>
    )
}
